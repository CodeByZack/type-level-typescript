import MonacoEditor, {
  OnMount,
  BeforeMount,
  OnChange,
  OnValidate,
  Monaco,
} from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import useForceRender from '../hooks/useForceRender';
// @ts-ignore
import libSource from '!!raw-loader!../utils/type.d.ts';
import confetti from 'canvas-confetti';
import PrettierWorker from 'worker-loader!../workers/prettier.worker.js';
import { createWorkerQueue } from '../utils/workers';

interface IProps {
  defaultValue?: string | [string, string];
  height?: number;
  name?: string;
}

interface IEditorData {
  value1: string;
  value2: string;
  isError: boolean;
  editor?: Parameters<OnMount>[0];
  isChallengeMode: boolean;
  tab: number;
}

const registerDocumentFormattingEditProviders = (monaco: Monaco) => {
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

const getBtnClassName = (choosed?: boolean) => {
  if (choosed) {
    return 'cursor-pointer rounded-t-md x-bg-editor x-font-mono text-xs text-gray-400 px-6 py-2';
  }
  return 'cursor-pointer rounded-t-md x-bg-editor x-font-mono text-xs text-gray-400 px-6 py-2 opacity-60';
};

const CodeEditor = (props: IProps) => {
  const { defaultValue, height = 400, name } = props;
  const [tab, setTab] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const forceRender = useForceRender();
  const edtiorDataRef = useRef<IEditorData>({
    value1: '',
    value2: '',
    isError: false,
    isChallengeMode: false,
    tab: 0,
  });

  const updateValue = () => {
    const { value1, value2, isChallengeMode, editor } = edtiorDataRef.current;
    const newVal = isChallengeMode ? (tab === 0 ? value1 : value2) : value1;
    editor?.setValue(newVal);
  };

  const handleErrorClear = (markers: any[]) => {
    console.log(markers);
    if (!markers.length && edtiorDataRef.current.tab === 0) {
      setIsSuccess(true);
      confetti();
    } else {
      setIsSuccess(false);
    }
  };

  const onValidate: OnValidate = (markers) => {
    handleErrorClear(
      markers.filter((m) => !['6133', '6196'].includes(m.code as string))
    );
  };

  const onMount: OnMount = (editor, monaco) => {
    edtiorDataRef.current.editor = editor;
    updateValue();
  };

  const onChange: OnChange = (value) => {
    const { isChallengeMode } = edtiorDataRef.current;
    if (isChallengeMode) {
      if (tab === 0) {
        edtiorDataRef.current.value1 = value;
      } else {
        edtiorDataRef.current.value2 = value;
      }
    } else {
      edtiorDataRef.current.value1 = value;
    }
  };

  const beforeMount: BeforeMount = (monaco) => {
    registerDocumentFormattingEditProviders(monaco);
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

  const reset = () => {
    const isChallengeMode = Array.isArray(defaultValue);
    if (isChallengeMode) {
      edtiorDataRef.current.value1 = defaultValue[0];
      edtiorDataRef.current.value2 = defaultValue[1];
    } else {
      edtiorDataRef.current.value1 = defaultValue;
    }
    updateValue();
    // setTab(0);
  };

  useEffect(() => {
    const isChallengeMode = Array.isArray(defaultValue);
    if (isChallengeMode) {
      edtiorDataRef.current.value1 = defaultValue[0];
      edtiorDataRef.current.value2 = defaultValue[1];
    } else {
      edtiorDataRef.current.value1 = defaultValue;
    }
    edtiorDataRef.current.isChallengeMode = isChallengeMode;
    forceRender();
  }, [defaultValue]);

  useEffect(() => {
    updateValue();
  }, [tab]);

  // const pathId = useMemo(() => unionId(), []);

  const renderHeader = () => {
    if (!edtiorDataRef.current.isChallengeMode) return null;
    return (
      <div className="flex items-end">
        <div
          className={getBtnClassName(tab === 0)}
          onClick={() => {
            setTab(0);
            edtiorDataRef.current.tab = 0;
          }}
        >
          Challenge
        </div>
        <div
          className={getBtnClassName(tab === 1)}
          onClick={() => {
            setTab(1);
            edtiorDataRef.current.tab = 1;
          }}
        >
          Solution
        </div>
        <button
          onClick={reset}
          className="mb-2 mr-1 mt-1 ml-auto rounded-md x-bg-editor x-font-mono text-xs text-gray-400 px-3 py-2 hover:bg-gray-700 active:bg-gray-800"
        >
          Reset
        </button>
      </div>
    );
  };

  return (
    <div
      className={`x-editor rounded-lg p-3 min-h-12 my-8 ${
        isSuccess && tab == 0 ? 'x-editor-success' : ''
      }`}
    >
      {renderHeader()}
      <div style={{ height }}>
        <MonacoEditor
          onMount={onMount}
          onChange={onChange}
          theme="customTheme"
          onValidate={onValidate}
          beforeMount={beforeMount}
          options={{
            fontSize: 16,
            lineNumbers: 'off',
            minimap: { enabled: false },
          }}
          path={name}
          defaultLanguage="typescript"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
