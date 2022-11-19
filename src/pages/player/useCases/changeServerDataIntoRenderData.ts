import { IMatchDetailData } from 'types/DetailObject';
import { changeDateUtil } from 'util/chageDate';
import { pickBestPlayer } from './matchRecordCase';

interface Props {
  matchDetailData: IMatchDetailData;
  nickName: string;
}

interface IViewData {
  matchType: string;
  matchResult: string;
  matchDate: string;
  leftPlayer: {
    nickName: string;
    goalCount: number;
    bestPlayer: {
      id: number;
      name: string;
      position: string;
      spId: number;
    };
  };
  rightPlayer: {
    nickName: string;
    goalCount: number;
    bestPlayer: {
      id: number;
      name: string;
      position: string;
      spId: number;
    };
  };
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
  if (userNickName === matchDetailData.matchInfo[1].nickname) {
    const sercherData = matchDetailData.matchInfo[1];
    const opponentData = matchDetailData.matchInfo[0];
    newState.leftPlayer.goalCount = sercherData.shoot.goalTotal;
    newState.rightPlayer.goalCount = opponentData.shoot.goalTotal;
    newState.leftPlayer.nickName = sercherData.nickname;
    newState.rightPlayer.nickName = opponentData.nickname;
    newState.matchResult = sercherData.matchDetail.matchResult;

    // 몰수패나 몰수승이 존재하는 경우
    newState.leftPlayer.bestPlayer.spId = pickBestPlayer(sercherData).spId;
    newState.rightPlayer.bestPlayer.spId = pickBestPlayer(opponentData).spId;
  } else {
    const sercherData = matchDetailData.matchInfo[0];
    const opponentData = matchDetailData.matchInfo[1];
    newState.leftPlayer.goalCount = sercherData.shoot.goalTotal;
    newState.rightPlayer.goalCount = opponentData.shoot.goalTotal;
    newState.leftPlayer.nickName = sercherData.nickname;
    newState.rightPlayer.nickName = opponentData.nickname;
    newState.matchResult = sercherData.matchDetail.matchResult;

    newState.leftPlayer.bestPlayer.spId = pickBestPlayer(opponentData).spId;
    newState.rightPlayer.bestPlayer.spId = pickBestPlayer(sercherData).spId;

    // newState.leftPlayer.bestPlayer.id =
    // newState.leftPlayer.bestPlayer.dto.spId;
    // newState.rightPlayer.bestPlayer.id =
    // newState.rightPlayer.bestPlayer.dto.spId;
  }
  return newState;
};
