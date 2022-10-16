export {};
/*
import { FlexItem, FlexBox } from '@components';
import { useGetMatchInfo } from 'hooks/useGetMatchInfo';
import Image from 'next/image';
import { ReactNode } from 'react';
import {
  pickBestPlayer,
  playerSpIdToImage,
} from 'src/useCases/matchRecordCase';
import styled from 'styled-components';
import PercentBar from '../UI/bar/PercentBar';

// build 과정에서 error가 발생하여 주석처리 해놓은 파일입니다.
// 해당 파일의 역할은 TestMatchResult.tsx가 대체할 예정입니다.


export interface MatchRecordBoxProps {
  children?: ReactNode;
  matchId: string;
}

const MatchResultBox = ({ children, matchId }: MatchRecordBoxProps) => {
  const {
    data: matchInfoData,
    isLoading,
    isSuccess,
  } = useGetMatchInfo(matchId);

  if (isLoading) return <div>loading...</div>;
  if (isSuccess) {
    const leftBestPlayer = pickBestPlayer(matchInfoData?.matchInfo[0]);
    const rightBestPlayer = pickBestPlayer(matchInfoData?.matchInfo[1]);

    return (
      <>
        <FlexBox style={{}}>
          <FlexItem style={{ flex: 4 }}>
            <FlexBox style={{}}>
              <FlexItem style={{ flex: 1 }}>
                <div>{matchInfoData.matchDate}</div>
                <div>{matchInfoData.matchType}</div>
                <div>{matchInfoData.matchInfo[0].matchDetail.matchResult}</div>
              </FlexItem>
              <FlexItem style={{ flex: 3 }}>
                <div>평점: {leftBestPlayer?.status.spRating}</div>
                <Image
                  src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${leftBestPlayer?.spId}.png`}
                  width="100px"
                  height="100px"
                  // placeholder=""
                  // blurDataURL=""
                />
                <div>
                  선수 골{leftBestPlayer?.status.goal} , 어시:
                  {leftBestPlayer?.status.assist}
                </div>
              </FlexItem>
            </FlexBox>
          </FlexItem>
          <FlexItem style={{ flex: 1 }}>
            <div>vs</div>
          </FlexItem>
          <FlexItem style={{ flex: 4 }}>
            <FlexBox style={{}}>
              <FlexItem style={{ flex: 1 }}>
                <div>평점: {rightBestPlayer?.status.spRating}</div>
              </FlexItem>
              <FlexItem style={{ flex: 9 }}>
                <Image
                  src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${rightBestPlayer?.spId}.png`}
                  width="100px"
                  height="100px"
                />
                <div>
                  선수 골{rightBestPlayer?.status.goal} , 어시:
                  {rightBestPlayer?.status.assist}
                </div>
              </FlexItem>
            </FlexBox>
          </FlexItem>
          <FlexItem>
            <AbsoluteButton text="화살표화살표화살표화살표화살표화살표화살표화살표" />
          </FlexItem>
        </FlexBox>
        <StyledBottom>
          <StyledInlineBlock
            width={matchInfoData?.matchInfo[0].matchDetail.possession}
            backgroundColor="orange"
          >
            {matchInfoData.matchInfo[0].nickname}
          </StyledInlineBlock>
          <StyledInlineBlock
            width={matchInfoData?.matchInfo[1].matchDetail.possession}
            backgroundColor="green"
          >
            {matchInfoData.matchInfo[1].nickname}
          </StyledInlineBlock>
        </StyledBottom>
      </>
    );
  }
  return <div>null</div>;
};

const StyledBottom = styled.div`
  width: 100%;
`;

// props로 퍼센트를 받아와서 width 적용해줄 수 있지 않을까?
// mutable width Span ?
const StyledInlineBlock = styled.span<{
  width: number;
  backgroundColor: string;
}>`
  display: inline-block;
  width: ${({ width }) => (width ? width : 50)}%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : null};
`;

export default MatchResultBox;

*/
