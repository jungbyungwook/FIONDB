import { apiInstance } from '../instance';

export interface UserTierRecord {
  matchType: number; // 매치종류
  division: number; // 등급 식별자
  achievementDate: string; // 최고등급 달성일자
}

type ResponseData = UserTierRecord[];

export const getUserTopTier = async (
  accessId: string | undefined,
): Promise<ResponseData> => {
  const API_URL = `users/${accessId}/maxdivision`;
  const { data } = await apiInstance(API_URL);

  return data;
};
