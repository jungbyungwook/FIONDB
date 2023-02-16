import { PositionCategoryKeyType } from 'src/constants/position';
import { useCaseMatchSearch } from 'src/useCases/useCaseMatchSearch';
import styled from 'styled-components';

interface Props {
  spId: number;
  position: PositionCategoryKeyType | undefined;
  inFormation: boolean;
}

export const SoccerPlayerName = ({ spId, position, inFormation }: Props) => {
  const { useSoccerPlayerName } = useCaseMatchSearch();
  const name = useSoccerPlayerName(spId);

  const lastName = name?.result.split(' ')[1] || name?.result.split(' ')[0];

  if (inFormation) {
    return (
      <S.InFormationName position={position}>{lastName}</S.InFormationName>
    );
  }
  return <span>{lastName}</span>;
};

const S = {
  InFormationName: styled.span<{ position?: PositionCategoryKeyType }>`
    @media ${({ theme }) => theme.media.small} {
      color: ${({ theme, position }) =>
        position === 'fw'
          ? theme.colors.position.fw
          : position === 'mf'
          ? theme.colors.position.mf
          : position === 'df'
          ? theme.colors.position.df
          : null};
    }
  `,
};
