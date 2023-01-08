import type { IMatchDetailData, MatchInfo } from 'types/DetailObject';
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
  // 여기서 matchDetailData가 예상과 다르게 들어와도 default 상태를 정의해주면 문제없이 동작할 것으로 보인다.
  const newState: IViewData = {
    matchType: '',
    matchResult: '',
    matchDate: '',
    leftPlayer: {
      nickName: '',
      goalCount: 0,
      // 🟡: 유저의 닉네임이 들어갈만한 최소 공간(점유율)
      possession: 70,
      bestPlayer: {
        id: 0,
        name: '',
        position: '',
        spId: 0,
      },
    },
    rightPlayer: {
      // 🟡: string type의 defualt 닉네임
      nickName: '무명유저',
      goalCount: 0,
      // 🟡: 유저의 닉네임이 들어갈만한 최소 공간(점유율)
      possession: 30,
      bestPlayer: {
        id: 0,
        name: '',
        position: '',
        spId: 0,
      },
    },
    matchDetails: [
      {},
      {
        // 🟡: MatchInfo[] 형식의 defautl data를 넣어줌
        player: [{}],
      },
    ] as MatchInfo[],
  };
  // 시간변환
  newState.matchDate = changeDateUtil(matchDetailData.matchDate);
  // leftPlyaer, rightPlaery
  // left: 검색한 본인

  // 기권패인 경우에는 관련 값들이 빈상태로 오는 경우도 존재한다.
  // 몰수패는 어떻게 보여줄꺼야....

  if (matchDetailData.matchInfo.length === 1) {
    const searcherData = matchDetailData.matchInfo[0];

    newState.matchDetails[0] = searcherData;
    newState.leftPlayer.bestPlayer.spId = pickBestPlayer(searcherData).spId;
    newState.leftPlayer.goalCount = searcherData.shoot.goalTotal;
    newState.leftPlayer.nickName = searcherData.nickname;
    newState.matchResult = searcherData.matchDetail.matchResult;

    return newState;
  }

  if (userNickName === matchDetailData.matchInfo[1].nickname) {
    const sercherData = matchDetailData.matchInfo[1];
    const opponentData = matchDetailData.matchInfo[0];

    newState.matchDetails[0] = sercherData;
    newState.matchDetails[1] = opponentData;
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
    //
    newState.matchDetails[0] = sercherData;
    newState.matchDetails[1] = opponentData;
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
    newState.leftPlayer.bestPlayer.spId = pickBestPlayer(sercherData).spId;
    newState.rightPlayer.bestPlayer.spId = pickBestPlayer(opponentData).spId;
  }
  return newState;
};
