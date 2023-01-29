export const linearSearch = (
  data: { id: number; name: string }[],
  target: number,
) => {
  for (let i = 0; i < data.length - 1; i++) {
    if (target === data[i].id)
      return {
        result: data[i].name,
        count: i,
      };
  }
};

export const binarySearch = (
  data: { id: number; name: string }[],
  target: number,
  left: number,
  right: number,
) => {
  let middle = 0;
  let count = 0;

  while (left <= right || count < 1000) {
    count++;
    middle = Math.floor((left + right) / 2);
    if (data[middle].id === target) return { result: data[middle].name, count };
    if (data[middle].id > target) right = middle + 1;
    if (data[middle].id < target) left = middle - 1;
  }
  return { result: '일치하는 정보가 없습니다.', count };
};
