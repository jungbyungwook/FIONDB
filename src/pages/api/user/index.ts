import { AxiosResponse } from 'axios';
import { off } from 'process';
import { api } from 'src/pages/api';
import { IMatchDetailData } from 'types/DetailObject';
import { UserProfile } from './getUserAccessId';

export type AccessId = string;
export type MatchId = string;
export type NickName = string;
export interface IMaxDivision {
  matchType: number;
  division: number;
  achievementDate: string;
}

const baseURL = {
  getUserProfile: () => 'users?',
  getUserTopTier: (accessId: AccessId) => `users/${accessId}/maxdivision`,
  getMatchDetail: (matchId: MatchId) => `matches/${matchId}`,
  getMatchList: (accessId: AccessId) => `users/${accessId}/matches?`,
};

const userAPI = {
  getUserProfile: async (nickName: NickName): Promise<UserProfile> => {
    const params: { nickname: string } = { nickname: nickName };
    const response = await api.get(baseURL.getUserProfile(), { params });
    return response.data;
  },
  getUserTopTier: async (accessId: AccessId): Promise<IMaxDivision[]> => {
    const { data } = await api.get(baseURL.getUserTopTier(accessId));
    return data;
  },
};

const matchAPI = {
  getMatchDetail: async (matchId: MatchId): Promise<IMatchDetailData> => {
    const { data } = await api.get(baseURL.getMatchDetail(matchId));
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
    const { data } = await api.get(baseURL.getMatchList(accessId), {
      params: defaultParams,
    });
    return data;
  },
};

export { userAPI, matchAPI };
