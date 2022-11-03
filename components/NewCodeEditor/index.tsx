import MonacoEditor, {
  OnMount,
  BeforeMount,
  OnChange,
  OnValidate,
  Monaco,
} from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import useForceRender from '../../hooks/useForceRender';
import confetti from 'canvas-confetti';
import {
  defineTheme,
  registerDocumentFormattingEditProviders,
  addExtraLib,
} from '../../utils/monaco';
import { BaseBtn } from '../NewCodeEditor/Btns';

interface IProps {
  defaultValue?: [string, string?];
  height?: number;
  name?: string;
  hideResetBtn?: boolean;
}

interface IEditorData {
  value1: string;
  value2: string;
  isError: boolean;
  editor?: Parameters<OnMount>[0];
  isChallengeMode: boolean;
  tab: number;
}

interface IHolderRef {
  challengeCode: string;
  solutionCode?: string;
  // isError: boolean;
  // editor?: Parameters<OnMount>[0];
  // isChallengeMode: boolean;
  tab: number;
}

const useCodeLogic = (defaultValue: IProps['defaultValue']) => {
  const ref = useRef<IHolderRef>({
    challengeCode: defaultValue[0],
    solutionCode: defaultValue[1],
    tab: 0,
  });
  const [editor, setEditor] = useState<Parameters<OnMount>[0]>();

  const onEditorMount = (editor: Parameters<OnMount>[0]) => {
    setEditor(editor);
    editor.setValue(ref.current.challengeCode);
    editor.onDidChangeModelContent((event) => {
      const val = editor.getValue();
      if (ref.current.tab === 0) {
        ref.current.challengeCode = val;
      } else {
        ref.current.solutionCode = val;
      }
    });
  };

  const setValue = (value: string) => {
    editor.setValue(value);
  };

  const onTabChange = (tab: number) => {
    ref.current.tab = tab;
    const { challengeCode, solutionCode } = ref.current;
    const newVal = tab === 0 ? challengeCode : solutionCode;
    setValue(newVal);
  };

  const reset = () => {
    const defauleVal = defaultValue[ref.current.tab];
    setValue(defauleVal);
  };

  return {
    setValue,
    setEditor,
    reset,
    onEditorMount,
    onTabChange,
  };
};

const CodeEditor = (props: IProps) => {
  const { defaultValue, height = 400, name, hideResetBtn } = props;
  const [tab, setTab] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const tabRef = useRef(tab);

  const codeEditor = useCodeLogic(defaultValue);

  const onValidate: OnValidate = (markers) => {
    const errors = markers.filter(
      (m) => !['6133', '6196'].includes(m.code as string)
    );
    if (!errors.length && tabRef.current === 0) {
      setIsSuccess(true);
      confetti();
    } else {
      setIsSuccess(false);
    }
  };

  const onMount: OnMount = (editor, monaco) => {
    codeEditor.onEditorMount(editor);
  };

  const beforeMount: BeforeMount = (monaco) => {
    registerDocumentFormattingEditProviders(monaco);
    defineTheme(monaco);
    addExtraLib(monaco);
  };

  const onTabChange = (tab: number) => () => {
    setTab(tab);
    tabRef.current = tab;
    codeEditor.onTabChange(tab);
  };

  const renderHeader = () => {
    const childNodes = [];

    if (defaultValue[1]) {
      const ChallengeJSX = (
        <BaseBtn onClick={onTabChange(0)} choosed={tab === 0}>
          Challenge
        </BaseBtn>
      );
      const SolutionJSX = (
        <BaseBtn onClick={onTabChange(1)} choosed={tab === 1}>
          Solution
        </BaseBtn>
      );

      childNodes.push(ChallengeJSX);
      childNodes.push(SolutionJSX);
    }

    if (!hideResetBtn) {
      const ResetJSX = (
        <BaseBtn isResetBtn onClick={codeEditor.reset}>
          Reset
        </BaseBtn>
      );
      childNodes.push(ResetJSX);
    }

    return <div className="flex items-end">{childNodes}</div>;
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
