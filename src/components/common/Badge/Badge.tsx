import { ReactNode } from 'react';
import styled from 'styled-components';

import { pixelToRem } from 'src/style/util';

interface Props {
  center: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  width?: number;
  height?: number;
  color: string;
  backgroundColor?: string;
}

export const Badge = ({
  left,
  center,
  right,
  width,
  height,
  color,
  backgroundColor,
}: Props) => {
  return (
    <StyledBadge
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
    >
      {left}
      {center}
      {right}
    </StyledBadge>
  );
};

const StyledBadge = styled.div<{
  width?: number;
  height?: number;
  color: string;
  backgroundColor?: string;
}>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${({ width }) => (width ? pixelToRem(width) : pixelToRem(39))};
  height: ${({ height }) => (height ? pixelToRem(height) : pixelToRem(25))};
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  background-color: ${({ theme, backgroundColor }) => backgroundColor};
  color: ${({ theme, color }) => color};
  font-weight: bold;

  @media ${({ theme }) => theme.media.small} {
    font-size: 1rem;
  }
`;
