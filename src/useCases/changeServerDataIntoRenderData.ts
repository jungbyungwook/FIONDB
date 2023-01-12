import { POSITION_TABLE } from 'src/constants/position';
import type {
  IMatchDetailData,
  MatchInfo,
  MatchResultType,
} from 'src/types/DetailObject';
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
  // 여기서 matchDetailData가 예상과 다르게 들어와도 default 상태를 정의해주면 문제없이 동작할 것으로 보인다.
  const newState: IViewData = {
    matchType: '',
    matchResult: '승',
    matchDate: '',
    leftPlayer: {
      nickName: '',
      goalCount: 0,
      // 🟡: 유저의 닉네임이 들어갈만한 최소 공간(점유율)
      possession: 70,
      bestPlayer: {
        id: 0,
        name: '',
        spPosition: '',
        spId: 0,
        spGrade: 0,
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
        spPosition: '',
        spId: 0,
        spGrade: 0,
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

  // 상대방이 특정 이유(닉네임변경, 계정삭제)로 인해 데이터가 넘어오지 않을 경우 처리
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
