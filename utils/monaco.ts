import { createWorkerQueue } from './workers';
// @ts-ignore
import PrettierWorker from 'worker-loader!../workers/prettier.worker.js';
// @ts-ignore
import libSource from '!!raw-loader!../utils/type.d.ts';
import { Monaco } from '@monaco-editor/react';

export const registerDocumentFormattingEditProviders = (monaco: Monaco) => {
  const disposables = [];
  let prettierWorker;

  const formattingEditProvider = {
    async provideDocumentFormattingEdits(model, _options, _token) {
      if (!prettierWorker) {
        prettierWorker = createWorkerQueue(PrettierWorker);
      }
      const { canceled, error, pretty } = await prettierWorker.emit({
        text: model.getValue(),
        language: model.getLanguageId(),
      });
      if (canceled || error) return [];
      return [
        {
          range: model.getFullModelRange(),
          text: pretty,
        },
      ];
    },
  };

  disposables.push(
    monaco.languages.registerDocumentFormattingEditProvider(
      'markdown',
      formattingEditProvider
    )
  );
  disposables.push(
    monaco.languages.registerDocumentFormattingEditProvider(
      'css',
      formattingEditProvider
    )
  );
  disposables.push(
    monaco.languages.registerDocumentFormattingEditProvider(
      'javascript',
      formattingEditProvider
    )
  );
  disposables.push(
    monaco.languages.registerDocumentFormattingEditProvider(
      'typescript',
      formattingEditProvider
    )
  );

  return {
    dispose() {
      disposables.forEach((disposable) => disposable.dispose());
      if (prettierWorker) {
        prettierWorker.terminate();
      }
    },
  };
};

export const defineTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme('customTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'function', foreground: 'f8f8f2' },
      { token: 'operator', foreground: 'dcdcdc' },
    ],
    colors: {},
  });
};

export const addExtraLib = (monaco: Monaco) => {
  // validation settings
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  // compiler options
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
  });
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    libSource,
    'ts:filename/facts.d.ts'
  );
};
