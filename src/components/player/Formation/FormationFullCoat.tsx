import styled from 'styled-components';

import { POSITION_TABLE } from 'src/constants/position';
import { MatchInfo } from 'src/types/DetailObject';
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
  const getSpId = (idx: 0 | 1): { [key: string]: number } => {
    return getPlayers(idx).reduce(
      (acc, cur) => ({ ...acc, ...{ [cur.spPosition]: cur.spId } }),
      {},
    );
  };

  const searcherSpId = getSpId(0);
  const opponentSpId = getSpId(1);

  return (
    <S.FlexWrap>
      <FormationHalfCoat spIds={searcherSpId} />
      <FormationHalfCoat spIds={opponentSpId} rotate={180} />
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
