import type { IMatchDetailData, MatchInfo } from 'src/types/DetailObject';
import { changeDateUtil } from 'util/chageDate';
import { getMatchPossession, pickBestPlayer } from './matchRecordCase';

export interface IRenderPlayerDto {
  nickName: string;
  goalCount: number;
  possession: number;
  bestPlayer: IRenderBestPlayerDto;
}

export interface IRenderBestPlayerDto {
  id: number;
  name: string;
  position: string;
  spId: number;
  spGrade: number;
}

export interface IViewData {
  matchType: string;
  matchResult: string;
  matchDate: string;
  leftPlayer: IRenderPlayerDto;
  rightPlayer: IRenderPlayerDto;
  matchDetails: MatchInfo[];
}

export const changeServerDataIntoRenderData = (
  matchDetailData: IMatchDetailData,
  userNickName: string,
) => {
  const newState: IViewData = {
    matchType: '',
    matchResult: '',
    matchDate: '',
    leftPlayer: {
      nickName: '',
      goalCount: 0,
      possession: 0,
      bestPlayer: {
        id: 0,
        name: '',
        position: '',
        spId: 0,
        spGrade: 0,
      },
    },
    rightPlayer: {
      nickName: '',
      goalCount: 0,
      possession: 0,
      bestPlayer: {
        id: 0,
        name: '',
        position: '',
        spId: 0,
        spGrade: 0,
      },
    },
    matchDetails: [{}, {}] as MatchInfo[],
  };
  // 시간변환
  newState.matchDate = changeDateUtil(matchDetailData.matchDate);
  // leftPlyaer, rightPlaery
  // left: 검색한 본인

  // 기권패인 경우에는 관련 값들이 빈상태로 오는 경우도 존재한다.
  // 몰수패는 어떻게 보여줄꺼야....

  const searcherData =
    userNickName === matchDetailData.matchInfo[1].nickname
      ? matchDetailData.matchInfo[1]
      : matchDetailData.matchInfo[0];
  const opponentData =
    userNickName === matchDetailData.matchInfo[1].nickname
      ? matchDetailData.matchInfo[0]
      : matchDetailData.matchInfo[1];

  newState.matchDetails[0] = searcherData;
  newState.matchDetails[1] = opponentData;
  // goalCount
  newState.leftPlayer.goalCount = searcherData.shoot.goalTotal;
  newState.rightPlayer.goalCount = opponentData.shoot.goalTotal;
  // nickName
  newState.leftPlayer.nickName = searcherData.nickname;
  newState.rightPlayer.nickName = opponentData.nickname;
  // matchResult
  newState.matchResult = searcherData.matchDetail.matchResult;
  // possession
  newState.leftPlayer.possession = getMatchPossession([
    searcherData,
    opponentData,
  ])[0];
  newState.rightPlayer.possession = getMatchPossession([
    searcherData,
    opponentData,
  ])[1];

  const leftBestPlayer = pickBestPlayer(searcherData);
  const rightBestPlayer = pickBestPlayer(opponentData);
  // spGarde
  newState.leftPlayer.bestPlayer.spGrade = leftBestPlayer.spGrade;
  newState.rightPlayer.bestPlayer.spGrade = rightBestPlayer.spGrade;
  // spId
  newState.leftPlayer.bestPlayer.spId = leftBestPlayer.spId;
  newState.rightPlayer.bestPlayer.spId = rightBestPlayer.spId;
  return newState;
};
