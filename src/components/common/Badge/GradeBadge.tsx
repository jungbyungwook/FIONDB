import styled from 'styled-components';

import theme from 'src/style/theme';
import { Badge } from './Badge';

interface Props {
  spGrade?: number;
  inFormation: boolean;
}

export const GradeBadge = ({ spGrade, inFormation }: Props) => {
  const gradeColor = theme.colors.grade;

  const color =
    !spGrade || spGrade < 5 ? theme.colors.gray[100] : theme.colors.gray[900];
  const backgroundColor = !spGrade
    ? undefined
    : spGrade < 2
    ? gradeColor.common
    : spGrade < 5
    ? gradeColor.bronze
    : spGrade < 8
    ? gradeColor.silver
    : gradeColor.gold;

  if (inFormation) {
    return (
      <S.Badge color={color} backgroundColor={backgroundColor}>
        {spGrade}
      </S.Badge>
    );
  }

  return (
    <Badge
      center={spGrade}
      color={color}
      backgroundColor={backgroundColor}
      width={22}
      height={22}
    />
  );
};

const S = {
  Badge: styled.div<{ color: string; backgroundColor: string | undefined }>`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 2.2rem;
    height: 2.2rem;
    color: ${({ color }) => color};
    font-weight: bold;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 0.5rem;

    @media ${({ theme }) => theme.media.small} {
      font-size: 1rem;
      width: 1.4rem;
      height: 1.2rem;
      border-radius: 0.2rem;
    }
  `,
};
