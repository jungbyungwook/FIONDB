import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  center: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  width?: number;
  height?: number;
  color: string;
  backgroundColor: string;
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

const getSizeRem = (size: number) => `${size}rem`;

const StyledBadge = styled.div<{
  width?: number;
  height?: number;
  color: string;
  backgroundColor: string;
}>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: ${({ width }) => (width ? getSizeRem(width) : getSizeRem(3.9))};
  height: ${({ height }) => (height ? getSizeRem(height) : getSizeRem(2.5))};
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  background-color: ${({ theme, backgroundColor }) => backgroundColor};
  color: ${({ theme, color }) => color};
  font-weight: bold;
`;
