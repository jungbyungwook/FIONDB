import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import { pixelToRem } from 'src/style/util';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
  style?: {
    width?: number;
    height?: number;
    color?: string;
    backgroundColor?: string;
  };
}

export const Button = ({
  left,
  center,
  right,
  type = 'button',
  style,
  ...props
}: Props) => {
  return (
    <StyledButton type={type} {...style} {...props}>
      {left}
      {center}
      {right}
    </StyledButton>
  );
};

const StyledButton = styled.button<Pick<Props, 'style'>>`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  width: ${({ style }) =>
    style?.width ? pixelToRem(style?.width) : pixelToRem(145)};
  height: ${({ style }) =>
    style?.height ? pixelToRem(style?.height) : pixelToRem(50)};
  border-radius: 0.5rem;
  padding: 1.3rem;
  background-color: ${({ theme, style }) =>
    style?.backgroundColor ? style?.backgroundColor : theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.fontSizes.subTitle[18]};
`;
