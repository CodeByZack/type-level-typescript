import MonacoEditor, {
  OnMount,
  BeforeMount,
  OnChange,
  OnValidate,
  Monaco,
} from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import useForceRender from '../hooks/useForceRender';
import confetti from 'canvas-confetti';
import { defineTheme, registerDocumentFormattingEditProviders, addExtraLib } from '../utils/monaco';

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
    defineTheme(monaco);
    addExtraLib(monaco);
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
