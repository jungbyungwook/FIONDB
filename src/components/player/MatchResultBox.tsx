import { useQueryClient } from 'react-query';
import {
  getDateByDateString,
  getMatchStringByMatchId,
  pickBestPlayer,
} from 'src/pages/player/useCases/matchRecordCase';
import styled from 'styled-components';
import { IMatchDetailData, PlayerDTO } from 'types/DetailObject';
import { changeDateUtil } from 'util/chageDate';
import { binarySearch } from 'util/search';
import PercentBar from '../UI/bar/PercentBar';
import { ImageWithFallback } from '../UI/Image/ImageWithFallback';

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
      status: {};
      // dto: PlayerDTO;
    };
  };
  rightPlayer: {
    nickName: string;
    goalCount: number;
    bestPlayer: {
      id: number;
      name: string;
      position: string;
      status: {};
      // dto: PlayerDTO;
    };
  };
  matchDetail: {};
}

export const MatchResultBox = ({ matchDetailData, nickName }: Props) => {
  const changeServerDataIntoRenderData = (data: any, userNickName: string) => {
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
          status: {},
          dto: {},
        },
      },
      rightPlayer: {
        nickName: '',
        goalCount: 0,
        bestPlayer: {
          id: 0,
          name: '',
          position: '',
          status: {},
          dto: {},
        },
      },
      matchDetail: {},
    };
    // 시간변환
    newState.matchDate = changeDateUtil(data.matchData);

    // leftPlyaer, rightPlaery
    // left: 검색한 본인
    if (userNickName === matchDetailData.matchInfo[1].nickname) {
      const sercherData = matchDetailData.matchInfo[1];
      const opponentData = matchDetailData.matchInfo[0];
      newState.leftPlayer.goalCount = sercherData.shoot.goalTotal;
      newState.rightPlayer.goalCount = opponentData.shoot.goalTotal;
      newState.leftPlayer.nickName = sercherData.nickname;
      newState.rightPlayer.nickName = opponentData.nickname;
      newState.matchResult = sercherData.matchDetail.matchResult;

      newState.leftPlayer.bestPlayer.dto = pickBestPlayer(sercherData);
      newState.rightPlayer.bestPlayer.dto = pickBestPlayer(opponentData);
    } else {
      const sercherData = matchDetailData.matchInfo[0];
      const opponentData = matchDetailData.matchInfo[1];
      newState.leftPlayer.goalCount = sercherData.shoot.goalTotal;
      newState.rightPlayer.goalCount = opponentData.shoot.goalTotal;
      newState.leftPlayer.nickName = sercherData.nickname;
      newState.rightPlayer.nickName = opponentData.nickname;
      newState.matchResult = sercherData.matchDetail.matchResult;

      newState.leftPlayer.bestPlayer.dto = pickBestPlayer(opponentData);
      newState.rightPlayer.bestPlayer.dto = pickBestPlayer(sercherData);

      // newState.leftPlayer.bestPlayer.id =
      // newState.leftPlayer.bestPlayer.dto.spId;
      // newState.rightPlayer.bestPlayer.id =
      // newState.rightPlayer.bestPlayer.dto.spId;
    }
    return newState;
  };

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['soccerPlayerMeta']);
  const sortedData = changeServerDataIntoRenderData(matchDetailData, nickName);

  const getSoccerPlayerNameBySpId = (spId: number) => {
    if (!data) return;
    // if (typeof data?.data === 'object') {
    return binarySearch(data?.data, spId, 0, data?.data.length);
    // }
  };

  return (
    <StyleContainer>
      <StyleCenter>
        <StyleResult>
          <div>{getMatchStringByMatchId(matchDetailData.matchType)}</div>
          <div>{sortedData.matchResult}</div>
          <div>{getDateByDateString(matchDetailData.matchDate)}</div>
        </StyleResult>
        <StyleLeftPlayer>
          <StyleBestPlayer>
            <ImageWithFallback
              fallbackSrc={''}
              width={50}
              height={50}
              src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${sortedData.leftPlayer.bestPlayer.dto.spId}.png`}
            />
            {/* <div>{sortedData.leftPlayer.nickName}</div> */}
            <div>
              {
                getSoccerPlayerNameBySpId(
                  sortedData.leftPlayer.bestPlayer.dto.spId,
                )?.result
              }
            </div>
          </StyleBestPlayer>
          <StyleBestPlayerStatus>
            능력치를 제공해주는 API는 존재하지 않는 것 같다.
          </StyleBestPlayerStatus>
        </StyleLeftPlayer>
        <StyleGoals>
          {sortedData.leftPlayer.goalCount} vs{' '}
          {sortedData.rightPlayer.goalCount}
        </StyleGoals>
        <StyleRightPlayer>
          <StyleBestPlayer>
            <ImageWithFallback
              fallbackSrc={''}
              width={50}
              height={50}
              src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${sortedData.rightPlayer.bestPlayer.dto.spId}.png`}
            />
            <div>
              {
                getSoccerPlayerNameBySpId(
                  sortedData.rightPlayer.bestPlayer.dto.spId,
                )?.result
              }
            </div>
          </StyleBestPlayer>
          <StyleBestPlayerStatus>
            능력치를 제공해주는 API는 존재하지 않는 것 같다.
          </StyleBestPlayerStatus>
        </StyleRightPlayer>
        <StyleDetail></StyleDetail>
      </StyleCenter>
      <StyleBottom>
        <PercentBar value={sortedData.leftPlayer.nickName} />
        <PercentBar value={sortedData.rightPlayer.nickName} />
      </StyleBottom>
    </StyleContainer>
  );
  // 점유율
};

const StyleContainer = styled.div`
  /* display: flex; */
  width: 100%;
  height: 100%;
  border: 1px solid green;
  color: white;
  background-color: black;
`;

const StyleTop = styled.div`
  border: 1px solid green;
`;
const StyleBottom = styled.div`
  border: 1px solid green;
`;
const StyleCenter = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 1px solid green;
  height: 100%;
  flex-basis: 100%;
`;
const StyleResult = styled.div`
  border: 1px solid green;
  flex-basis: 10rem;
`;
const StyleDetail = styled.div`
  border: 1px solid green;
  flex-basis: 5rem;
`;
const StyleGoals = styled.div`
  border: 1px solid green;
  flex-basis: 10rem;
`;
const StyleLeftPlayer = styled.div`
  display: flex;
  border: 1px solid green;
  flex: 1;
`;
const StyleRightPlayer = styled.div`
  display: flex;
  border: 1px solid green;
  flex: 1;
`;

const StyleBestPlayer = styled.div`
  border: 1px solid green;
  flex: 1;
  flex-basis: 10rem;
`;
const StyleBestPlayerStatus = styled.div`
  border: 1px solid green;
  flex: 1;
  flex-basis: 10rem;
`;
