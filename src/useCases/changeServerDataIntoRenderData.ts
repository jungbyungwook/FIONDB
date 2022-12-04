import type { IMatchDetailData } from 'types/DetailObject';
import { changeDateUtil } from 'util/chageDate';
import { getMatchPossession, pickBestPlayer } from './matchRecordCase';

interface IRenderPlayerDto {
  nickName: string;
  goalCount: number;
  possession: number;
  bestPlayer: {
    id: number;
    name: string;
    position: string;
    spId: number;
  };
}

interface IViewData {
  matchType: string;
  matchResult: string;
  matchDate: string;
  leftPlayer: IRenderPlayerDto;
  rightPlayer: IRenderPlayerDto;
  matchDetail: {};
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
      },
    },
    matchDetail: {},
  };
  // 시간변환
  newState.matchDate = changeDateUtil(matchDetailData.matchDate);
  // leftPlyaer, rightPlaery
  // left: 검색한 본인

  // 기권패인 경우에는 관련 값들이 빈상태로 오는 경우도 존재한다.
  // 몰수패는 어떻게 보여줄꺼야....

  if (userNickName === matchDetailData.matchInfo[1].nickname) {
    const sercherData = matchDetailData.matchInfo[1];
    const opponentData = matchDetailData.matchInfo[0];
    // goalCount
    newState.leftPlayer.goalCount = sercherData.shoot.goalTotal;
    newState.rightPlayer.goalCount = opponentData.shoot.goalTotal;
    // nickName
    newState.leftPlayer.nickName = sercherData.nickname;
    newState.rightPlayer.nickName = opponentData.nickname;
    //matchResult
    newState.matchResult = sercherData.matchDetail.matchResult;
    // possession
    newState.leftPlayer.possession = getMatchPossession([
      sercherData,
      opponentData,
    ])[0];
    newState.rightPlayer.possession = getMatchPossession([
      sercherData,
      opponentData,
    ])[1];
    // spId
    newState.leftPlayer.bestPlayer.spId = pickBestPlayer(sercherData).spId;
    newState.rightPlayer.bestPlayer.spId = pickBestPlayer(opponentData).spId;
  } else {
    const sercherData = matchDetailData.matchInfo[0];
    const opponentData = matchDetailData.matchInfo[1];
    // goalCount
    newState.leftPlayer.goalCount = sercherData.shoot.goalTotal;
    newState.rightPlayer.goalCount = opponentData.shoot.goalTotal;
    // nickName
    newState.leftPlayer.nickName = sercherData.nickname;
    newState.rightPlayer.nickName = opponentData.nickname;
    // matchResult
    newState.matchResult = sercherData.matchDetail.matchResult;
    // possession
    newState.leftPlayer.possession = getMatchPossession([
      sercherData,
      opponentData,
    ])[0];
    newState.rightPlayer.possession = getMatchPossession([
      sercherData,
      opponentData,
    ])[1];
    // spId
    newState.leftPlayer.bestPlayer.spId = pickBestPlayer(opponentData).spId;
    newState.rightPlayer.bestPlayer.spId = pickBestPlayer(sercherData).spId;
  }
  return newState;
};
