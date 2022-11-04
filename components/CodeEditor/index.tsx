import MonacoEditor, {
  OnMount,
  BeforeMount,
  OnValidate,
} from '@monaco-editor/react';
import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  defineTheme,
  registerDocumentFormattingEditProviders,
  addExtraLib,
} from '../../utils/monaco';
import { BaseBtn } from './Btns';
import useCodeEditorLogic from './useCodeEditorLogic';

interface IProps {
  defaultValue?: [string, string?];
  height?: number;
  name?: string;
  hideResetBtn?: boolean;
  onEditorMount?: (editor : Parameters<OnMount>[0]) => void;
}

const CodeEditor = (props: IProps) => {
  const { defaultValue, height = 400, name, hideResetBtn, onEditorMount } = props;
  const [tab, setTab] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const tabRef = useRef(tab);

  const codeEditor = useCodeEditorLogic(defaultValue);

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
    if(typeof onEditorMount === "function"){
      onEditorMount(editor);
    }
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

    if (!hideResetBtn || defaultValue[1]) {
      const ChallengeJSX = (
        <BaseBtn key="challenge" onClick={onTabChange(0)} choosed={tab === 0}>
          Challenge
        </BaseBtn>
      );
      childNodes.push(ChallengeJSX);
    }

    if (defaultValue[1]) {
      const SolutionJSX = (
        <BaseBtn key="solution" onClick={onTabChange(1)} choosed={tab === 1}>
          Solution
        </BaseBtn>
      );
      childNodes.push(SolutionJSX);
    }

    if (!hideResetBtn) {
      const ResetJSX = (
        <BaseBtn key="reset" isResetBtn onClick={codeEditor.reset}>
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
