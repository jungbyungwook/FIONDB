import { useQueryClient } from 'react-query';
import {
  getDateByDateString,
  getMatchStringByMatchId,
  soccerImageDefaultSrc,
} from 'src/pages/player/useCases/matchRecordCase';
import styled from 'styled-components';
import { binarySearch } from 'util/search';
import { PercentBar } from 'src/components/ui/bar/PercentBar';
import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import { metaQueryKey } from 'src/pages/api/hooks/useGetMetaQuery';
import { changeServerDataIntoRenderData } from 'src/pages/player/useCases/changeServerDataIntoRenderData';
import type { IMetaSpId } from 'src/pages/api/player/type';
import type { IMatchDetailData } from 'types/DetailObject';

interface Props {
  matchDetailData: IMatchDetailData;
  nickName: string;
}

export const MatchResultBox = ({ matchDetailData, nickName }: Props) => {
  // useCases에 분리할 예정
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
