import { useEffect, useState } from 'react';
import { debounce } from 'src/util/debounce';

type InitialWindowSizeType = {
  width: undefined | number;
  height: undefined | number;
};

const initialWindowSize: InitialWindowSizeType = {
  width: undefined,
  height: undefined,
};

export const useCheckWindowSize = () => {
  const [windowSize, setWindowSize] = useState(initialWindowSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const debounceHandleResize = debounce(handleResize);

    handleResize();
    window.addEventListener('resize', debounceHandleResize);

    return () => window.removeEventListener('resize', debounceHandleResize);
  }, []);

  return {
    windowSize,
  };
};
