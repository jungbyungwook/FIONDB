import { SoccerPlayer } from 'src/components/player/SoccerPlayer/SoccerPlayer';
import { POSITION_LOCATIONS } from 'src/constants/position';
import { PlayerDTO } from 'src/types/DetailObject';
import styled from 'styled-components';

interface ForMationBoxProps {
  isMine: boolean;
  playerDto: { [key: string]: PlayerDTO };
  rotate?: number;
}

export const FormationHalfCoat = ({
  isMine,
  playerDto,
  rotate,
}: ForMationBoxProps) => {
  const positionsEntries = Object.entries(POSITION_LOCATIONS);
  const positionsList = rotate
    ? [...positionsEntries].reverse()
    : positionsEntries;

  return (
    <S.FormationWrap>
      <S.GridContainer type={'column'} rotate={rotate}>
        {positionsList.map(([key, positions], columnIndex) =>
          positions.map((position, rowIndex) => {
            return (
              playerDto?.[position] && (
                <S.GridItem
                  key={position}
                  className={position}
                  columnNum={Number(columnIndex) + 1}
                  rowNum={Number(rowIndex) + 1}
                >
                  <S.ImageWrap rotate={rotate}>
                    <SoccerPlayer
                      inFormation
                      playerDto={playerDto[position]}
                      isMine={isMine}
                      topOption={false}
                    />
                  </S.ImageWrap>
                </S.GridItem>
              )
            );
          }),
        )}
      </S.GridContainer>
    </S.FormationWrap>
  );
};

const S = {
  FormationWrap: styled.div`
    width: 50%;
    padding: 2rem 1rem;
  `,
  GridContainer: styled.div<{ type: 'column' | 'row'; rotate?: number }>`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(5, 1fr);
    row-gap: 1rem;
    column-gap: 1rem;
    font-size: 2rem;
  `,
  GridItem: styled.div<{ columnNum: number; rowNum: number }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    grid-column: ${(props) => props.columnNum};
    grid-row: ${(props) => props.rowNum};
    text-align: center;

    font-size: 1.2rem;
  `,
  ImageWrap: styled.div<{ rotate: number | undefined }>`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-bottom: 50%;
  `,
};
