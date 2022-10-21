import getPlayerImage from 'src/pages/api/user/getPlayerImage';
import { MatchInfo } from '../../types/DetailObject';

// const matchRecordCase = () => {};

// pick bset player
// 단일책임? 받은 데이터를 통해 내림차순을 진행하고 그를 return 해주는 함수
const pickBestPlayer = (data?: MatchInfo) => {
  if (!data) return;
  const { player } = data;

  // 선수가 담긴 배열을 내림차순으로 정렬하여 가장 높은 선수를 pick
  // 🟠 조금 더 효과적인 방식으로 Refactoring 가능한 부분
  const sortedPlayerList = player.sort(
    (left, right) => right.status.spRating - left.status.spRating,
  );
  const bestPlayer = sortedPlayerList[0];

  return bestPlayer;
};

// 🟡 result를 string 보다 확실하게 할 수 있다.
// interface GetMatchResultReturn {
//   type: '공식경기' | '감독경기'; // 우선은 여기까지
//   date: string; // '몇일전' | '일주일전' 등
//   result: string; //
// }

// MatchInfo 타입의 객체에서 UI에서 필요한 데이터만 추상화하는 부분
// 단일책임:  받은 데이터에서 필요한 데이터만 추상화해서 보내주는 역할
// const getMatchResult = (data: MatchInfo): GetMatchResultReturn => {
//   const { matchDetail } = data;
//   return {
//     type: '공식경기',
//     date: '하루전',
//     result: matchDetail.matchResult,
//   };
// };

const playerSpIdToImage = (spid: number) => {
  const image = getPlayerImage(spid);
  return image;
};

// change date to string
const changeDateToString = () => {};

export { pickBestPlayer, playerSpIdToImage };
