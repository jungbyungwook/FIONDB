import { useState } from 'react';
import { useAtomValue } from 'jotai';

import type { IMatchDetailData } from 'src/types/DetailObject';
import {
  getDateByDateString,
  getMatchStringByMatchId,
} from 'src/useCases/matchRecordCase';
import { SoccerPlayer } from 'src/components/player/SoccerPlayer/SoccerPlayer';
import { BallPossessionBar } from 'src/components/common/Bar/BallPossessionBar';
import { MATCH_RESULT_TEXT } from 'src/constants/matchResultText';
import ArrowIcon from 'src/assets/svg/arrow.svg';
import { changeServerDataIntoRenderData } from 'src/util/changeServerDataIntoRenderData';
import { FormationBoard } from 'src/components/player/Formation/FormationBoard';
import { FormationFullCoat } from 'src/components/player/Formation/FormationFullCoat';
import { mediaAtom } from 'src/atoms/device';
import * as S from './style';

interface Props {
  matchDetailData: IMatchDetailData;
  nickName: string;
}

export const MatchResultBox = ({ matchDetailData, nickName }: Props) => {
  const sortedData = changeServerDataIntoRenderData(matchDetailData, nickName);
  const [isOpenFormation, setIsOpenFormation] = useState(false);
  const media = useAtomValue(mediaAtom);

  const toggle = () => setIsOpenFormation((pre) => !pre);

  const matchResultContent = {
    matchType: (
      <S.StyleMatchType>
        {getMatchStringByMatchId(matchDetailData.matchType)}
      </S.StyleMatchType>
    ),
    matchResult: (
      <S.StyleMatchResult matchResult={sortedData.matchResult}>
        {media === 'pc'
          ? MATCH_RESULT_TEXT[sortedData.matchResult]
          : MATCH_RESULT_TEXT[sortedData.matchResult][0]}
      </S.StyleMatchResult>
    ),
    matchDate: (
      <S.StyleMatchDate>
        {getDateByDateString(matchDetailData.matchDate)}
      </S.StyleMatchDate>
    ),
  };

  const centerContent = {
    pc: (
      <>
        <S.StyleGoalsWrap>
          <S.StyleGoals>{sortedData.leftPlayer.goalCount}</S.StyleGoals>
          <S.StyleVS>vs</S.StyleVS>
          <S.StyleGoals>{sortedData.rightPlayer.goalCount}</S.StyleGoals>
        </S.StyleGoalsWrap>
      </>
    ),
    mobile: (
      <>
        {matchResultContent.matchResult}
        <S.StyleGoalsWrap>
          <S.StyleGoals>{sortedData.leftPlayer.goalCount}</S.StyleGoals>
          <S.StyleVS>vs</S.StyleVS>
          <S.StyleGoals>{sortedData.rightPlayer.goalCount}</S.StyleGoals>
        </S.StyleGoalsWrap>
        {matchResultContent.matchDate}
      </>
    ),
  };

  return (
    <S.RelativeContainer>
      <S.StyleResultBar matchResult={sortedData.matchResult} />
      <S.StyleSection>
        <S.StyleWrap>
          <S.StyleContainer>
            <S.StyleTop>
              <S.StyleLeft>
                <S.StyleResultWrap>
                  <S.StyleResultTitle>
                    {matchResultContent.matchType}
                    {matchResultContent.matchResult}
                  </S.StyleResultTitle>
                  {matchResultContent.matchDate}
                </S.StyleResultWrap>
                <S.StyleLeftPlayer>
                  <SoccerPlayer
                    playerDto={sortedData.leftPlayer.bestPlayer}
                    isMine
                    inFormation={false}
                  />
                </S.StyleLeftPlayer>
              </S.StyleLeft>
              <S.StyleCenter>{centerContent[media]}</S.StyleCenter>
              <S.StyleRight>
                <S.StyleRightPlayer>
                  <SoccerPlayer
                    playerDto={sortedData.rightPlayer.bestPlayer}
                    isMine={false}
                    inFormation={false}
                  />
                </S.StyleRightPlayer>
              </S.StyleRight>
              <S.StyleDetail onClick={toggle}>
                <S.StyleRotateWrap isClick={isOpenFormation}>
                  <ArrowIcon width={'2rem'} height={'2rem'} fill="white" />
                </S.StyleRotateWrap>
              </S.StyleDetail>
            </S.StyleTop>
            <S.StyleBottom>
              <BallPossessionBar playerDto={sortedData.leftPlayer} isMine />
              <BallPossessionBar
                playerDto={sortedData.rightPlayer}
                isMine={false}
              />
            </S.StyleBottom>
          </S.StyleContainer>
        </S.StyleWrap>
      </S.StyleSection>
      {isOpenFormation && (
        <FormationBoard matchDetailData={sortedData.matchDetails}>
          <FormationFullCoat matchDetailData={sortedData.matchDetails} />
        </FormationBoard>
      )}
    </S.RelativeContainer>
  );
  // 점유율
};
