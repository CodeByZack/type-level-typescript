import { OnMount } from '@monaco-editor/react';
import { useRef, useState } from 'react';

interface IHolderRef {
  challengeCode: string;
  solutionCode?: string;
  tab: number;
}

const useCodeEditorLogic = (defaultValue: [string, string?]) => {
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

export default useCodeEditorLogic;
