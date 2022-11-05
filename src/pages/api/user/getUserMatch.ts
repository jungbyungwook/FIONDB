import { apiInstance } from 'src/pages/api/instance';
import { IMatchDetailData } from 'types/DetailObject';
import { getMatchDetailData } from './getMatchDetailData';

type UserMatchRecord = string[];
interface getUserMatchParams {
  matchtype: number; // 매치타입
  offset: number; // 매치의 시작 번호
  limit: number; // 받아올 매치의 수
}

type ResponseData = UserMatchRecord;

export const getMatchDetailDatas = async (
  accessId: string | undefined,
): Promise<IMatchDetailData[]> => {
  const API_URL = `users/${accessId}/matches?`;
  // 어떤걸로 매치타입을 받아오더라? 여기서 matchtype, offset, limit은

  // test data
  const [matchtype, offset, limit]: number[] = [50, 0, 20];
  const params: getUserMatchParams = { matchtype, offset, limit };
  const { data }: { data: ResponseData } = await apiInstance(API_URL, {
    params,
  });

  const promises = data.map((postId: string) => getMatchDetailData(postId));

  return await Promise.all(promises);
};
