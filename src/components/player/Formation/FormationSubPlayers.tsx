import { SoccerPlayer } from 'src/components/player/SoccerPlayer/SoccerPlayer';
import { POSITION_TABLE } from 'src/constants/position';
import { MatchInfo, PlayerDTO } from 'src/types/DetailObject';
import styled from 'styled-components';

interface Props {
  matchDetailData: MatchInfo[];
}

const SUB = 'SUB';

export const FormationSubPlayers = ({ matchDetailData }: Props) => {
  const getPlayers = (idx: 0 | 1) => {
    return matchDetailData[idx].player.map((player) => ({
      ...player,
      ...{ spPosition: POSITION_TABLE[player.spPosition] },
    }));
  };

  const getSubPlayers = (idx: 0 | 1) => {
    return getPlayers(idx).filter(({ spPosition }) => spPosition === SUB);
  };

  const mySubPlayers = getSubPlayers(0);

  return (
    <S.Container>
      {mySubPlayers.map((subPlayer) => (
        <S.ImageWrap rotate={undefined}>
          <SoccerPlayer
            playerDto={subPlayer}
            topOption={false}
            contentOption={false}
            inFormation
            isMine
          />
        </S.ImageWrap>
      ))}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
  `,
  ImageWrap: styled.div<{ rotate: number | undefined }>`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
  `,
};
