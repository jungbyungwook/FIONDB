import { metaAPI } from 'src/pages/api/player';
import { changeDateUtil } from 'util/chageDate';
import { MatchInfo } from '../../types/DetailObject';

// 몰수패인 경우 패자의 possession이 0으로 나온는 문제를 해결
// default값을 20으로 두어

const getMatchPossession = (data: MatchInfo[]) => {
  const leftMatchDetail = data[0].matchDetail;
  const rightMatchDetail = data[1].matchDetail;
  const defaultPossessions = {
    leftWin: [80, 20],
    rightWin: [20, 80],
  };

  // 몰수승인 경우
  if (leftMatchDetail.matchEndType === 1) return defaultPossessions.leftWin;
  // 몰수패인 경우
  if (rightMatchDetail.matchEndType === 1) return defaultPossessions.rightWin;
  // end type normal
  return [leftMatchDetail.possession, rightMatchDetail.possession];
};

const pickBestPlayer = (data: MatchInfo) => {
  const { player } = data;
  if (!player.length) return { spId: 0 };

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
  getMatchPossession,
  getMatchStringByMatchId,
  getDateByDateString,
  getBestPlayerNicknameBySpId,
};

export const soccerImageDefaultSrc =
  'https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png?rd=202211180250';

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
