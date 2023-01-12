export const getOffset = (percent: string) => {
  return `${(100 - parseInt(percent)) / 2}%`;
};

export const getWinPercent = (data: number[]) => {
  const winCount = data[0];
  const totalCount = data.reduce((acc, cur) => acc + cur, 0);

  // (승리) ÷ (경기수) x 100%
  return Math.ceil((winCount / totalCount) * 100);
};

// const MATCH_RESULT_LIST = ['승리', '무승부', '패배'];
