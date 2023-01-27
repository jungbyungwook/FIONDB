import { api } from 'src/pages/api';
import type { AccessId, IMaxDivision, NickName } from 'src/pages/api/type';
import { baseURL } from 'src/pages/api/url';
import { IUserProfile } from 'src/useCases/useCaseUserProfile';

export const userAPI = {
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
