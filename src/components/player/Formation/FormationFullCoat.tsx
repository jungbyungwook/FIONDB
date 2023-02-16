import styled from 'styled-components';

import { POSITION_TABLE } from 'src/constants/position';
import { MatchInfo, PlayerDTO } from 'src/types/DetailObject';
import { renderUpIntoDown } from 'src/style/keyframes';
import { FormationHalfCoat } from 'src/components/player/Formation/FormationHalfCoat';
import soccerCoatUrl from 'src/assets/png/soccer_coat.png';
import mobileSoccerCoatUrl from 'src/assets/png/mobile_soccer_coat.png';

interface FormationContainerProps {
  matchDetailData: MatchInfo[];
}

export const FormationFullCoat = ({
  matchDetailData,
}: FormationContainerProps) => {
  const getPlayers = (idx: 0 | 1) => {
    return matchDetailData[idx].player.map((player) => ({
      ...player,
      ...{ spPosition: POSITION_TABLE[player.spPosition] },
    }));
  };

  const getPlayersBySpPositon = (idx: 0 | 1): { [key: string]: PlayerDTO } => {
    return getPlayers(idx).reduce(
      (acc, cur) => ({ ...acc, ...{ [cur.spPosition]: cur } }),
      {},
    );
  };

  const searcherPlayers = getPlayersBySpPositon(0);
  const opponentPlayers = getPlayersBySpPositon(1);

  return (
    <S.FlexWrap>
      <FormationHalfCoat isMine playerDto={searcherPlayers} />
      <FormationHalfCoat
        isMine={false}
        rotate={180}
        playerDto={opponentPlayers}
      />
    </S.FlexWrap>
  );
};

const S = {
  FlexWrap: styled.div`
    display: flex;
    height: 60rem;
    background-image: url(${soccerCoatUrl.src});
    background-size: 100% 100%;

    animation: ${renderUpIntoDown} 1s;

    @media ${({ theme }) => theme.media.small} {
      display: block;
      width: 34rem;
      height: 80rem;
      margin: 0 0.8rem;
      background-image: url(${mobileSoccerCoatUrl.src});
    }
  `,
};
