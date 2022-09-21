import instance from '../instance';

// interface DetailMatch {
//   matchId: string; //매치 고유 식별자
//   matchDate: string; //매치 일자 (ex. 2019-05-13T18:03:10)
//   matchType: string[]; //매치 종류 (/metadata/matchtype API 참고)
//   matchInfo: any[];
// }

type UserMatchRecord = string[];
interface getUserMatchParams {
  matchtype: number; // 매치타입
  offset: number; // 매치의 시작 번호
  limit: number; // 받아올 매치의 수
}

type ResponseData = UserMatchRecord;

export const getUserMatch = async (
  accessId: string | undefined,
): Promise<ResponseData> => {
  const API_URL = `users/${accessId}/matches?`;
  // 어떤걸로 매치타입을 받아오더라? 여기서 matchtype, offset, limit은

  // test data
  const [matchtype, offset, limit]: number[] = [50, 0, 20];
  const params: getUserMatchParams = { matchtype, offset, limit };
  const { data } = await instance(API_URL, { params });
  return data;
};
