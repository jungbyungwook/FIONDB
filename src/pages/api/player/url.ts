import { AccessId, MatchId } from 'src/pages/api/player/type';

export const baseURL = {
  user: {
    getUserProfile: () => 'users?',
    getUserTopTier: (accessId: AccessId) => `users/${accessId}/maxdivision`,
  },
  match: {
    getMatchDetail: (matchId: MatchId) => `matches/${matchId}`,
    getMatchList: (accessId: AccessId) => `users/${accessId}/matches?`,
  },
  meta: {
    getMetaSpId: 'https://static.api.nexon.co.kr/fifaonline4/latest/spid.json',
    getMetaMatchType:
      'https://static.api.nexon.co.kr/fifaonline4/latest/matchtype.json',
    getMetaDivision:
      'https://static.api.nexon.co.kr/fifaonline4/latest/division.json',
    getMetaSeasonId:
      'https://static.api.nexon.co.kr/fifaonline4/latest/seasonid.json',
  },
};
