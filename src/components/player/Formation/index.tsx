import styled from 'styled-components';

import { SoccerPlayerImage } from 'src/components/common/SoccerPlayerImage';
import { SoccerPlayerName } from 'src/components/common/SoccerPlayerName';
import { POSITION_LOCATIONS, POSITION_TABLE } from 'src/constants/position';
import { MatchInfo } from 'types/DetailObject';
interface FormationContainerProps {
  matchDetailData: MatchInfo[];
}

// 정렬해서 넘겨주자.
export const FormationContainer = ({
  matchDetailData,
}: FormationContainerProps) => {
  const getPlayers = (idx: 0 | 1) => {
    const result = matchDetailData[idx].player.map((player) => ({
      ...player,
      ...{ spPosition: POSITION_TABLE[player.spPosition] },
    }));

    return result;
  };

  const getSpId = (idx: 0 | 1) => {
    return getPlayers(idx).reduce(
      (acc, cur) => ({ ...acc, ...{ [cur.spPosition]: cur.spId } }),
      {},
    );
  };

  const searcherSpId = getSpId(0);
  const opponentSpId = getSpId(1);

  return (
    <FlexWrap>
      <Formation spIds={searcherSpId} />
      <Formation spIds={opponentSpId} rotate={180} />
    </FlexWrap>
  );
};

const FlexWrap = styled.div`
  display: flex;
`;

interface ForMationBoxProps {
  spIds: { [key: string]: number };
  rotate?: number;
}

const Formation = ({ spIds, rotate }: ForMationBoxProps) => {
  const positionsEntries = Object.entries(POSITION_LOCATIONS);
  const positionsList = rotate
    ? [...positionsEntries].reverse()
    : positionsEntries;

  return (
    <FormationWrap>
      <GridContainer type={'column'} rotate={rotate}>
        {positionsList.map(([key, positions], columnIndex) =>
          positions.map((position, rowIndex) => {
            return (
              spIds?.[position] && (
                <GridItem
                  key={position}
                  className={position}
                  columnNum={Number(columnIndex) + 1}
                  rowNum={Number(rowIndex) + 1}
                >
                  <ImageWrap rotate={rotate}>
                    <SoccerPlayerImage
                      src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spIds?.[position]}.png`}
                    />
                  </ImageWrap>
                  <SoccerPlayerName spId={spIds?.[position]} />
                </GridItem>
              )
            );
          }),
        )}
      </GridContainer>
    </FormationWrap>
  );
};

const FormationWrap = styled.div`
  width: 50%;
  padding: 5rem 1rem;
  border: 1px solid green;
`;

const GridContainer = styled.div<{ type: 'column' | 'row'; rotate?: number }>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 1fr);
  row-gap: 1rem;
  column-gap: 1rem;
  font-size: 2rem;
`;

const GridItem = styled.div<{ columnNum: number; rowNum: number }>`
  grid-column: ${(props) => props.columnNum};
  grid-row: ${(props) => props.rowNum};
  text-align: center;

  font-size: 1.2rem;
`;

const ImageWrap = styled.div<{ rotate: number | undefined }>`
  width: 5rem;
  height: 5rem;
  border: ${({ rotate }) => (rotate ? '1px solid silver' : '1px solid gold')};
  border-radius: 50%;
  overflow: hidden;
`;

const FormationHeader = () => {
  return <header>header</header>;
};

const FormationMain = () => {
  return <div>main</div>;
};

const FormationFooter = () => {
  return <footer>footer</footer>;
};
