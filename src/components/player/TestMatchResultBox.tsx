import { ReactNode, useEffect, useState } from 'react';
import { useGetMatchInfo } from 'hooks/useGetMatchInfo';
import ListItem from '../UI/ListItem';
import PercentBar from '../UI/bar/PercentBar';
import { changeDateUtil } from 'util/chageDate';
// import type { MatchRecordBoxProps } from './MatchResultBox';
import BestPlayerBox from './BestPlayerBox';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getUserAccessId } from 'src/pages/api/user/getUserAccessId';
import { getMatchInfo } from 'src/pages/api/user/getMatchInfo';
import { MatchInfo } from 'types/DetailObject';

export interface Props {
  children?: ReactNode;
  matchId: string;
  nickName: string | undefined;
}

interface ViewData {
  // 자신의 기록을 볼 것이니까.
  // matchInfo 배열
  nickName: string;
  matchType: number;
  matchDate: string;
  // 이긴사람골을 먼저 보여주자.
  goalCounts: number[];
  bestPlayers: {}[];
}

// 1. matchInfo의 nickName을 기준으로 정렬해주자.
// 2. 렌더링에 필요한 데이터를 추출하여 state로 만들자.
// 3. 컴포넌트에 뿌려주자.

const TestMatchResultBox = ({ matchId, nickName }: Props) => {
  // const [matchInfoState, setMatchInfoState] = useState<MatchInfo[]>();
  // const {
  //   data: matchInfoData,
  //   status,
  //   isLoading,
  //   isSuccess,
  // } = useGetMatchInfo(matchId);
  console.log(matchId);

  const {
    data: matchInfoData,
    status,
    isLoading,
    isSuccess,
  } = useQuery(['matchInfo'], () => getMatchInfo(matchId));

  // const { data: userData } = useQuery(['useAccessId'], () =>
  //   getUserAccessId(nickName),
  // );

  if (isLoading) {
    // console.log(userData);
    console.log(matchId, nickName);
    return <div> loading... </div>;
  }

  if (isSuccess) {
    // console.log(nickName);
    const { matchType, matchInfo, matchDate } = matchInfoData;
    // usecases로 분리할 수 있지 않을까?
    const leftPlayer =
      matchInfo[0].nickname === nickName ? matchInfo[0] : matchInfo[1];
    const rightPlayer =
      matchInfo[1].nickname === nickName ? matchInfo[0] : matchInfo[1];
    matchInfo[1];
    const leftGoal = leftPlayer.shoot.goalTotal;
    const rightGoal = rightPlayer.shoot.goalTotal;

    return (
      <>
        <ListItem right={<button>화살표</button>} style={{ display: 'flex' }}>
          <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div>{matchType}</div>
              <div>{matchInfo[0].matchDetail.matchResult}</div>
              <div style={{ color: 'white' }}>{changeDateUtil(matchDate)}</div>
            </div>
            <div style={{ flex: 4 }}>
              <BestPlayerBox matchInfo={leftPlayer} />
            </div>
            <div style={{ flex: 1 }}>
              <div>
                {leftGoal} vs {rightGoal}
              </div>
            </div>
            <div style={{ flex: 4 }}>
              <BestPlayerBox matchInfo={rightPlayer} />
            </div>
          </div>
        </ListItem>
        <StyledPossessionWrap>
          <PercentBar
            // 몰수패인 경우에는 0이다.
            // 다 분리해내자..
            style={{
              width: !matchInfo[0].matchDetail.possession
                ? 5
                : matchInfo[0].matchDetail.possession,
              backgroundColor: 'orange',
            }}
            value={leftPlayer.nickname}
          />
          <PercentBar
            style={{
              width: !matchInfo[0].matchDetail.possession
                ? 95
                : matchInfo[1].matchDetail.possession,
              backgroundColor: 'green',
            }}
            value={rightPlayer.nickname}
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
