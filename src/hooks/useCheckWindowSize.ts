import { useEffect, useState } from 'react';

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

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowSize,
  };
};
