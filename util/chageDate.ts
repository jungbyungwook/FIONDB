import dayjs from 'dayjs';

export const changeDateUtil = (date: string) => {
  const second = 1;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  const todayDate = new Date();
  const targetDate = new Date(date);

  // 두의 날짜를 차이를 구하는 부분
  // 0.001초가 1일 것이다. / 1000 을 하면 1초단위
  const elapsedSeconds = Math.trunc(
    (todayDate.getTime() - targetDate.getTime()) / 1000,
  );

  if (elapsedSeconds < minute) return '방금 전';
  if (elapsedSeconds < hour)
    return `${Math.trunc(elapsedSeconds / minute)}분 전`;
  if (elapsedSeconds < day)
    return `${Math.trunc(elapsedSeconds / hour)}시간 전`;
  if (elapsedSeconds < week) return `${Math.trunc(elapsedSeconds / day)}일 전`;
  if (elapsedSeconds < week * 4)
    return `${Math.trunc(elapsedSeconds / week)}주 전`;

  return dayjs(date).format('YY.MM.DD');
};
