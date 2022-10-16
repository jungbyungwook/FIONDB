import { apiInstance } from 'api/instance';
import { MatchInfoBody } from 'types/DetailObject';

export const getMatchInfo = async (matchId: string): Promise<MatchInfoBody> => {
  const API_URL = `matches/${matchId}`;
  const { data } = await apiInstance(API_URL);
  return data;
};
