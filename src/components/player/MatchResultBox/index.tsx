import { useState } from 'react';

import {
  getDateByDateString,
  getMatchStringByMatchId,
} from 'src/useCases/matchRecordCase';
import { PercentBar } from 'src/components/ui/bar/PercentBar';
import { changeServerDataIntoRenderData } from 'src/useCases/changeServerDataIntoRenderData';
import DownArrowIcon from 'src/assets/svg/down_arrow.svg';
import type { IMatchDetailData } from 'src/types/DetailObject';
import { SoccerPlayer } from 'src/components/player/SoccerPlayer';
import { BestPlayerBadge } from 'src/components/common/Badge/BestPlayerBadge';
import * as S from './style';
import { FormationContainer } from '../Formation';

interface Props {
  matchDetailData: IMatchDetailData;
  nickName: string;
}

export const MatchResultBox = ({ matchDetailData, nickName }: Props) => {
  const sortedData = changeServerDataIntoRenderData(matchDetailData, nickName);
  const [isOpenFormation, setIsOpenFormation] = useState(false);

  const toggle = () => setIsOpenFormation((pre) => !pre);

  return (
    <S.StyleSection>
      <S.StyleWrap>
        <S.StyleResultBar isWin={sortedData.matchResult === '승'} />
        <S.StyleContainer>
          <S.StyleTop>
            <S.StyleLeft>
              <S.StyleResult>
                <S.StyleResultTitle>
                  <div>
                    {getMatchStringByMatchId(matchDetailData.matchType)}
                  </div>
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
              <S.StyleDetail onClick={toggle}>
                <S.StyleRotateWrap isClick={isOpenFormation}>
                  <DownArrowIcon width={'1rem'} height={'2rem'} fill="white" />
                </S.StyleRotateWrap>
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
      </S.StyleWrap>
      {isOpenFormation && (
        <FormationContainer matchDetailData={sortedData.matchDetails} />
      )}
    </S.StyleSection>
  );
  // 점유율
};
