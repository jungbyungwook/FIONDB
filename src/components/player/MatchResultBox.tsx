import { useQueryClient } from 'react-query';
import {
  getDateByDateString,
  getMatchStringByMatchId,
  pickBestPlayer,
  soccerImageDefaultSrc,
} from 'src/pages/player/useCases/matchRecordCase';
import styled from 'styled-components';
import { IMatchDetailData } from 'types/DetailObject';
import { changeDateUtil } from 'util/chageDate';
import { binarySearch } from 'util/search';
import { PercentBar } from 'src/components/ui/bar/PercentBar';
import { ImageWithFallback } from '../ui/Image/ImageWithFallback';
import { metaQueryKey } from 'src/pages/api/hooks/useGetMetaQuery';
import { IMetaSpId } from 'src/pages/api/player/type';

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

export const MatchResultBox = ({ matchDetailData, nickName }: Props) => {
  // useCases에 분리할 예정
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
    newState.matchDate = changeDateUtil(data.matchData);
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

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(
    metaQueryKey.soccerPlayersMeta,
  ) as IMetaSpId[];
  const sortedData = changeServerDataIntoRenderData(matchDetailData, nickName);

  const getSoccerPlayerNameBySpId = (spId: number) => {
    if (!data) return;
    if (spId === 0) return { result: '몰수패 선수', count: 0 };
    return binarySearch(data, spId, 0, data.length);
  };

  return (
    <StyleContainer
      backgroundColor={sortedData.matchResult === '패' ? '#392321' : undefined}
    >
      <StyleTop>
        <StyleLeft>
          <StyleResultBar
            backgroundColor={
              sortedData.matchResult === '패' ? '#8A2E1A' : undefined
            }
          />
          <StyleResult>
            <StyleResultTitle>
              <div>{getMatchStringByMatchId(matchDetailData.matchType)}</div>
              <div>{sortedData.matchResult}</div>
            </StyleResultTitle>
            <div>{getDateByDateString(matchDetailData.matchDate)}</div>
          </StyleResult>
          <StyleLeftPlayer>
            <StyleBestPlayer>
              <ImageWithFallback
                fallbackSrc={soccerImageDefaultSrc}
                width={50}
                height={50}
                placeholder="blur"
                blurDataURL={soccerImageDefaultSrc}
                loading="lazy"
                src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${sortedData.leftPlayer.bestPlayer.spId}.png`}
              />
              <div>
                {
                  getSoccerPlayerNameBySpId(
                    sortedData.leftPlayer.bestPlayer.spId,
                  )?.result
                }
              </div>
            </StyleBestPlayer>
            <StyleBestPlayerStatus>
              {/* 능력치를 제공해주는 API는 존재하지 않는 것 같다. */}
            </StyleBestPlayerStatus>
          </StyleLeftPlayer>
        </StyleLeft>
        <StyleCenter>
          <StyleGoals>
            {sortedData.leftPlayer.goalCount + ' '}vs
            {' ' + sortedData.rightPlayer.goalCount}
          </StyleGoals>
        </StyleCenter>
        <StyleRight>
          <StyleRightPlayer>
            <StyleBestPlayer>
              <ImageWithFallback
                fallbackSrc={soccerImageDefaultSrc}
                alt="sdf"
                width={50}
                height={50}
                placeholder="blur"
                blurDataURL={soccerImageDefaultSrc}
                loading="lazy"
                src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${sortedData?.rightPlayer?.bestPlayer?.spId}.png`}
              />
              <div>
                {
                  getSoccerPlayerNameBySpId(
                    sortedData.rightPlayer.bestPlayer.spId,
                  )?.result
                }
              </div>
            </StyleBestPlayer>
            <StyleBestPlayerStatus>
              {/* 능력치를 제공해주는 API는 존재하지 않는 것 같다. */}
            </StyleBestPlayerStatus>
          </StyleRightPlayer>
          <StyleDetail></StyleDetail>
        </StyleRight>
      </StyleTop>
      <StyleBottom>
        <PercentBar
          value={sortedData.leftPlayer.nickName}
          style={{
            width: '50',
            backgroundColor: '#584A1D',
          }}
        />
        <PercentBar
          value={sortedData.rightPlayer.nickName}
          style={{
            width: '50',
            backgroundColor: '#3B205C',
          }}
        />
      </StyleBottom>
    </StyleContainer>
  );
  // 점유율
};

const StyleContainer = styled.div<{ backgroundColor: string | undefined }>`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${(props) => props.backgroundColor || '#273042'};
`;
const StyleTop = styled.div`
  display: flex;
  justify-content: center;
`;
const StyleBottom = styled.div``;
const StyleCenter = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyleLeft = styled.div`
  display: flex;
  flex: 2;
  justify-content: start;
  align-items: center;
  gap: 2rem;
`;
const StyleRight = styled.div`
  display: flex;
  flex: 2;
  justify-content: end;
  align-items: center;
  gap: 2rem;
`;
const StyleResultBar = styled.div<{ backgroundColor: string | undefined }>`
  height: 100%;
  width: 0.4rem;
  background-color: ${(props) => props.backgroundColor || '#3351A0'};
`;
const StyleResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

const StyleResultTitle = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;
const StyleGoals = styled.div`
  font-size: 1.5rem;
`;
const StyleLeftPlayer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;
const StyleRightPlayer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;
const StyleDetail = styled.div`
  height: 100%;
  flex-basis: 2rem;
  background-color: gray;
  opacity: 0.4;
  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;
const StyleBestPlayer = styled.div`
  text-align: center;
`;
const StyleBestPlayerStatus = styled.div``;
