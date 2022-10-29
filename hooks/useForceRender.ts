import { useCallback, useState } from 'react';

const useForceRender = () => {
  const [, setValue] = useState<number>(0);

  return useCallback((): void => {
    setValue((num) => num + 1);
  }, []);
};

export default useForceRender;
