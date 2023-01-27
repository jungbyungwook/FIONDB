import { api } from 'src/pages/api';
import { MatchId, AccessId } from 'src/pages/api/type';
import { baseURL } from 'src/pages/api/url';

import type { IMatchDetailData } from 'src/types/DetailObject';

export const matchAPI = {
  getMatchDetail: async (matchId: MatchId): Promise<IMatchDetailData> => {
    const { data } = await api.get(baseURL.match.getMatchDetail(matchId));
    return data;
  },
  getMatchList: async (
    accessId: AccessId,
    offset: number,
  ): Promise<string[]> => {
    const defaultParams = {
      matchType: 50,
      offset: offset,
      limit: 20,
    };
    const { data } = await api.get(baseURL.match.getMatchList(accessId), {
      params: defaultParams,
    });
    return data;
  },
};
