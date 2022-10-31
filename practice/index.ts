// @ts-ignore
import introduction from '!!raw-loader!./00-introduction.ts';
// @ts-ignore
import tavoduction from '!!raw-loader!./01-types-and-values.ts';

const spliter = '// ==============================================';

const splitPracticeStr = (str: string) => {
  const arr = str.split(spliter).map((s) => s.replace(/^\s+|\s+$/g, ''));
  // console.log(arr);
  return arr;
};

export const intrParcticeArr = splitPracticeStr(introduction);
export const tavParcticeArr = splitPracticeStr(tavoduction);
