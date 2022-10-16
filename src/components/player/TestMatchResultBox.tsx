import { ReactNode } from 'react';
import { useGetMatchInfo } from 'hooks/useGetMatchInfo';
import ListItem from '../UI/ListItem';
import PercentBar from '../UI/bar/PercentBar';
// import type { MatchRecordBoxProps } from './MatchResultBox';
import BestPlayerBox from './BestPlayerBox';
import styled from 'styled-components';

export interface Props {
  children?: ReactNode;
  matchId: string;
}

const TestMatchResultBox = ({ matchId }: Props) => {
  const {
    data: matchInfoData,
    isLoading,
    isSuccess,
  } = useGetMatchInfo(matchId);

  if (isSuccess) {
    const { matchType, matchInfo, matchDate } = matchInfoData;
    return (
      <>
        <ListItem right={<button>화살표</button>} style={{ display: 'flex' }}>
          <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div>{matchType}</div>
              <div>{matchInfo[0].matchDetail.matchResult}</div>
              <div>{matchDate}</div>
            </div>
            <div style={{ flex: 4 }}>
              <BestPlayerBox matchInfo={matchInfo[0]} />
            </div>
            <div style={{ flex: 1 }}>
              <div>4 : 0</div>
            </div>
            <div style={{ flex: 4 }}>
              <BestPlayerBox matchInfo={matchInfo[1]} />
            </div>
          </div>
        </ListItem>
        <StyledPossessionWrap>
          <PercentBar
            style={{
              width: matchInfo[0].matchDetail.possession,
              backgroundColor: 'orange',
            }}
            value={matchInfoData.matchInfo[0].nickname}
          />
          <PercentBar
            style={{
              width: matchInfo[1].matchDetail.possession,
              backgroundColor: 'green',
            }}
            value={matchInfo[1].nickname}
          />
        </StyledPossessionWrap>
      </>
    );
  }

  return <ListItem right={<div>asdf</div>}>loading</ListItem>;
};

const StyledPossessionWrap = styled.div`
  width: 100%;
`;

export default TestMatchResultBox;
