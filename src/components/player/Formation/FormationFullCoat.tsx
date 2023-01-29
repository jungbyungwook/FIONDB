import styled from 'styled-components';

import { POSITION_TABLE } from 'src/constants/position';
import { MatchInfo, PlayerDTO } from 'src/types/DetailObject';
import soccerCoatUrl from 'src/assets/png/soccer_coat.png';
import { renderUpIntoDown } from 'src/style/keyframes';
import { FormationHalfCoat } from 'src/components/player/Formation/FormationHalfCoat';

interface FormationContainerProps {
  matchDetailData: MatchInfo[];
}

// 정렬해서 넘겨주자.
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
  `,
};
