import {
  getDateByDateString,
  getMatchStringByMatchId,
} from 'src/useCases/matchRecordCase';
import { PercentBar } from 'src/components/ui/bar/PercentBar';
import { changeServerDataIntoRenderData } from 'src/useCases/changeServerDataIntoRenderData';
import DownArrowIcon from 'src/assets/svg/down_arrow.svg';
import type { IMatchDetailData } from 'types/DetailObject';
import { SoccerPlayer } from 'src/components/player/SoccerPlayer';
import { BestPlayerBadge } from 'src/components/common/Badge/BestPlayerBadge';

import * as S from './style';

interface Props {
  matchDetailData: IMatchDetailData;
  nickName: string;
}

export const MatchResultBox = ({ matchDetailData, nickName }: Props) => {
  const sortedData = changeServerDataIntoRenderData(matchDetailData, nickName);
  return (
    <S.StyleContainer
      backgroundColor={
        sortedData.matchResult === '패'
          ? '#392321'
          : sortedData.matchResult === '무'
          ? '#1D4346'
          : undefined
      }
    >
      <S.StyleTop>
        <S.StyleLeft>
          <S.StyleResultBar
            backgroundColor={
              sortedData.matchResult === '패'
                ? '#8A2E1A'
                : sortedData.matchResult === '무'
                ? '#00BBA3'
                : undefined
            }
          />
          <S.StyleResult>
            <S.StyleResultTitle>
              <div>{getMatchStringByMatchId(matchDetailData.matchType)}</div>
              <div>{sortedData.matchResult}</div>
            </S.StyleResultTitle>
            <div>{getDateByDateString(matchDetailData.matchDate)}</div>
          </S.StyleResult>
          <S.StyleLeftPlayer>
            <SoccerPlayer playerDto={sortedData.leftPlayer.bestPlayer}>
              <BestPlayerBadge
                type={
                  sortedData.matchResult === '승' ||
                  sortedData.matchResult === '무'
                    ? '승'
                    : '패'
                }
              />
            </SoccerPlayer>
          </S.StyleLeftPlayer>
        </S.StyleLeft>
        <S.StyleCenter>
          <S.StyleGoals>
            {sortedData.leftPlayer.goalCount + ' '}vs
            {' ' + sortedData.rightPlayer.goalCount}
          </S.StyleGoals>
        </S.StyleCenter>
        <S.StyleRight>
          <S.StyleRightPlayer>
            <SoccerPlayer playerDto={sortedData.rightPlayer.bestPlayer}>
              <BestPlayerBadge
                type={
                  sortedData.matchResult === '승' ||
                  sortedData.matchResult === '무'
                    ? '패'
                    : '승'
                }
              />
            </SoccerPlayer>
          </S.StyleRightPlayer>
          <S.StyleDetail>
            <DownArrowIcon width={'1rem'} height={'2rem'} fill="white" />
          </S.StyleDetail>
        </S.StyleRight>
      </S.StyleTop>
      <S.StyleBottom>
        <PercentBar
          value={sortedData.leftPlayer.nickName}
          style={{
            width: sortedData.leftPlayer.possession,
            backgroundColor: '#584A1D',
          }}
        />
        <PercentBar
          value={sortedData.rightPlayer.nickName}
          style={{
            width: sortedData.rightPlayer.possession,
            backgroundColor: '#3B205C',
          }}
        />
      </S.StyleBottom>
    </S.StyleContainer>
  );
  // 점유율
};
