// event에 의해 return 하는 함수가 호출되면 계속 claseTimeout 해주고 더이상 event가 일어나지 않으면 setTimeout에 의해 delay후 function이 호출된다.
export const debounce = (func: () => void, milliseconds?: number) => {
  const time = milliseconds || 200;
  let timer: any;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time);
  };
};
