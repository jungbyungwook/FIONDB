import { metaAPI } from 'src/pages/api/player';
import { changeDateUtil } from 'util/chageDate';
import { MatchInfo } from '../../../../types/DetailObject';

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

const getBestPlayerNicknameBySpId = async (spId?: number) => {
  try {
    const response = await metaAPI.getSoccerPlayerMeta();
    return response;
  } catch (err) {}
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

const getMatchStringByMatchId = (matchId: number) => {
  const matchMap = new Map();
  matchMetaData.forEach(({ matchtype, desc }) => matchMap.set(matchtype, desc));

  return matchMap.get(matchId);
};

// change date to string
const getDateByDateString = (matchData: string) => {
  const result = changeDateUtil(matchData);
  return result;
};

export {
  pickBestPlayer,
  getMatchStringByMatchId,
  getDateByDateString,
  getBestPlayerNicknameBySpId,
};

const matchMetaData = [
  {
    matchtype: 30,
    desc: '리그 친선',
  },
  {
    matchtype: 40,
    desc: '클래식 1on1',
  },
  {
    matchtype: 50,
    desc: '공식경기',
  },
  {
    matchtype: 52,
    desc: '감독모드',
  },
  {
    matchtype: 60,
    desc: '공식 친선',
  },
  {
    matchtype: 204,
    desc: '볼타 친선',
  },
  {
    matchtype: 214,
    desc: '볼타 공식',
  },
  {
    matchtype: 224,
    desc: '볼타 AI대전',
  },
  {
    matchtype: 234,
    desc: '볼타 커스텀',
  },
];
