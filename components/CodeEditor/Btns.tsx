import { MouseEventHandler } from 'react';

const resetBtnClassName =
  'cursor-pointer mb-2 mr-1 mt-1 ml-auto rounded-md x-bg-editor x-font-mono text-xs text-gray-400 px-3 py-2 hover:bg-gray-700 active:bg-gray-800';

const getBtnClassName = (choosed?: boolean) => {
  if (choosed) {
    return 'cursor-pointer rounded-t-md x-bg-editor x-font-mono text-xs text-gray-400 px-6 py-2';
  }
  return 'cursor-pointer rounded-t-md x-bg-editor x-font-mono text-xs text-gray-400 px-6 py-2 opacity-60';
};

interface IBtnProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  choosed?: boolean;
  children: React.ReactNode;
  isResetBtn?: boolean;
}

export const BaseBtn = (props: IBtnProps) => {
  const { onClick = () => {}, choosed, children, isResetBtn } = props;
  const cn = isResetBtn ? resetBtnClassName : getBtnClassName(choosed);
  return (
    <div className={cn} onClick={onClick}>
      {children}
    </div>
  );
};
