import { useState } from 'react';

import type { IMatchDetailData } from 'src/types/DetailObject';
import {
  getDateByDateString,
  getMatchStringByMatchId,
} from 'src/useCases/matchRecordCase';
import { changeServerDataIntoRenderData } from 'src/useCases/changeServerDataIntoRenderData';
import DownArrowIcon from 'src/assets/svg/down_arrow.svg';
import { SoccerPlayer } from 'src/components/player/SoccerPlayer';
import { BestPlayerBadge } from 'src/components/common/Badge/BestPlayerBadge';
import { BallPossessionBar } from 'src/components/common/Bar/BallPossessionBar';
import { FormationContainer } from '../Formation';
import { MATCH_RESULT_TEXT } from 'src/constants/matchResultText';
import * as S from './style';

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
              <S.StyleResultWrap>
                <S.StyleResultTitle>
                  <S.StyleMatchType>
                    {getMatchStringByMatchId(matchDetailData.matchType)}
                  </S.StyleMatchType>
                  <S.StyleMatchResult
                    isWin={MATCH_RESULT_TEXT[sortedData.matchResult] === '승리'}
                  >
                    {MATCH_RESULT_TEXT[sortedData.matchResult]}
                  </S.StyleMatchResult>
                </S.StyleResultTitle>
                <S.StyleMatchDate>
                  {getDateByDateString(matchDetailData.matchDate)}
                </S.StyleMatchDate>
              </S.StyleResultWrap>
              <S.StyleLeftPlayer>
                <SoccerPlayer
                  playerDto={sortedData.leftPlayer.bestPlayer}
                  isMine={true}
                >
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
              <S.StyleGoalsWrap>
                <S.StyleGoals>{sortedData.leftPlayer.goalCount}</S.StyleGoals>
                <S.StyleVS>vs</S.StyleVS>
                <S.StyleGoals>{sortedData.rightPlayer.goalCount}</S.StyleGoals>
              </S.StyleGoalsWrap>
            </S.StyleCenter>
            <S.StyleRight>
              <S.StyleRightPlayer>
                <SoccerPlayer
                  playerDto={sortedData.rightPlayer.bestPlayer}
                  isMine={false}
                >
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
            <BallPossessionBar
              playerDto={sortedData.leftPlayer}
              isMine={true}
            />
            <BallPossessionBar
              playerDto={sortedData.rightPlayer}
              isMine={false}
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
