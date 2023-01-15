import { MatchResultType } from 'src/types/DetailObject';

export type MATCH_REUSLT_TEXT_VALUE = '승리' | '패배' | '무승부';

export const MATCH_RESULT_TEXT: Record<
  MatchResultType,
  MATCH_REUSLT_TEXT_VALUE
> = {
  승: '승리',
  패: '패배',
  무: '무승부',
};
