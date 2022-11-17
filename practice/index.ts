// @ts-ignore
import introduction from '!!raw-loader!./00-introduction.ts';
// @ts-ignore
import tavoduction from '!!raw-loader!./01-types-and-values.ts';
// @ts-ignore
import typeAreDataPracticeStr from '!!raw-loader!./02-types-are-just-data.ts';
// @ts-ignore
import objectAndRecordsPracticeStr from '!!raw-loader!./03-objects-and-records.ts';

const spliter = '// ==============================================';

const splitPracticeStr = (str: string) => {
  const arr = str.split(spliter).map((s) => s.replace(/^\s+|\s+$/g, ''));
  // console.log(arr);
  return arr;
};

export const intrPracticeArr = splitPracticeStr(introduction);
export const tavPracticeArr = splitPracticeStr(tavoduction);
export const typeAreDataPracticeArr = splitPracticeStr(typeAreDataPracticeStr);
export const objectAndRecordsPracticeArr = splitPracticeStr(objectAndRecordsPracticeStr);
