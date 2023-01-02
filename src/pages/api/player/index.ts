import { AxiosResponse } from 'axios';
import { api } from 'src/pages/api';
import { IMatchDetailData } from 'src/types/DetailObject';
import { IUserProfile } from '../hooks/query/useGetUserProfileQuery';
import type {
  AccessId,
  IMaxDivision,
  IMetaDivision,
  IMetaMatchType,
  IMetaSpId,
  MatchId,
  NickName,
} from './type';

const baseURL = {
  user: {
    getUserProfile: () => 'users?',
    getUserTopTier: (accessId: AccessId) => `users/${accessId}/maxdivision`,
  },
  match: {
    getMatchDetail: (matchId: MatchId) => `matches/${matchId}`,
    getMatchList: (accessId: AccessId) => `users/${accessId}/matches?`,
  },
  meta: {
    getMetaSpId: () =>
      'https://static.api.nexon.co.kr/fifaonline4/latest/spid.json',
    getMetaMatchType: () =>
      'https://static.api.nexon.co.kr/fifaonline4/latest/matchtype.json',
    getMetaDivision: () =>
      'https://static.api.nexon.co.kr/fifaonline4/latest/division.json',
  },
};

const userAPI = {
  getUserProfile: async (nickName: NickName): Promise<IUserProfile> => {
    const params: { nickname: string } = { nickname: nickName };
    const response = await api.get(baseURL.user.getUserProfile(), { params });
    return response.data;
  },
  getUserTopTier: async (accessId: AccessId): Promise<IMaxDivision[]> => {
    const { data } = await api.get(baseURL.user.getUserTopTier(accessId));
    return data;
  },
};

const matchAPI = {
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

const metaAPI = {
  getSoccerPlayerMeta: async (): Promise<AxiosResponse<IMetaSpId[]>> => {
    const response = await api.get(baseURL.meta.getMetaSpId());
    return response.data;
  },
  getMatchTypeMeta: async (): Promise<AxiosResponse<IMetaMatchType[]>> =>
    await api.get(baseURL.meta.getMetaMatchType()),
  getMatchDivisionMeta: async (): Promise<AxiosResponse<IMetaDivision[]>> =>
    await api.get(baseURL.meta.getMetaDivision()),
};

export { userAPI, matchAPI, metaAPI };
