import instance from 'api/instance';

interface Params {
  nickName: string;
}

interface UserProfile {
  accessId: string; //	유저 고유 식별자
  nickname: string; //	유저 닉네임
  level: number; //	유저 레벨
}

export const getUserAccessId = async (
  nickName: string,
): Promise<UserProfile> => {
  const API_URL = 'users?';
  const params: Params = { nickName };
  const { data } = await instance(API_URL, { params });

  return data;
};
