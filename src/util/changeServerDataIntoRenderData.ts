import { POSITION_TABLE } from 'src/constants/position';
import type {
  IMatchDetailData,
  MatchInfo,
  MatchResultType,
} from 'src/types/DetailObject';
import { changeDateUtil } from 'src/util/chageDate';
import {
  getMatchPossession,
  pickBestPlayer,
} from '../useCases/matchRecordCase';

export interface IRenderPlayerDto {
  nickName: string;
  goalCount: number;
  possession: number;
  bestPlayer: IRenderBestPlayerDto;
}

export interface IRenderBestPlayerDto {
  spPosition: string;
  spId: number;
  spGrade: number;
}

export interface IViewData {
  matchType: string;
  matchResult: MatchResultType;
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
    matchResult: '승',
    matchDate: '',
    leftPlayer: {
      nickName: '',
      goalCount: 0,
      // 유저의 닉네임이 들어갈만한 최소 공간(점유율)
      possession: 70,
      bestPlayer: {
        spPosition: '',
        spId: 0,
        spGrade: 0,
      },
    },
    rightPlayer: {
      nickName: '무명유저',
      goalCount: 0,
      // 유저의 닉네임이 들어갈만한 최소 공간(점유율)
      possession: 30,
      bestPlayer: {
        spPosition: '',
        spId: 0,
        spGrade: 0,
      },
    },
    matchDetails: [
      {},
      {
        player: [{}],
      },
    ] as MatchInfo[],
  };
  // 시간변환
  newState.matchDate = changeDateUtil(matchDetailData.matchDate);
  if (matchDetailData.matchInfo.length === 1) {
    const searcherData = matchDetailData.matchInfo[0];
    const bestPlayer = pickBestPlayer(searcherData);

    newState.matchDetails[0] = searcherData;
    // spId
    newState.leftPlayer.bestPlayer.spId = bestPlayer.spId;
    // spPosition
    newState.leftPlayer.bestPlayer.spPosition =
      POSITION_TABLE[bestPlayer.spPosition];
    // spGrade
    newState.leftPlayer.bestPlayer.spGrade = bestPlayer.spGrade;

    newState.leftPlayer.goalCount = searcherData.shoot.goalTotal;

    newState.leftPlayer.nickName = searcherData.nickname;

    newState.matchResult = searcherData.matchDetail.matchResult;

    const possessisons = getMatchPossession([searcherData]);
    newState.leftPlayer.possession = possessisons[0];
    newState.rightPlayer.possession;
    possessisons[1];

    return newState;
  }

  // 정상적으로 나와 상대방의 정보데이터가 존재할 경우
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
  // position
  newState.leftPlayer.bestPlayer.spPosition =
    POSITION_TABLE[leftBestPlayer.spPosition];
  newState.rightPlayer.bestPlayer.spPosition =
    POSITION_TABLE[rightBestPlayer.spPosition];

  return newState;
};
