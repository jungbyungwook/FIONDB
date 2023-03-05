import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const GoalLoadingSpinnerContainer = ({ children }: Props) => {
  return (
    <S.Background>
      <S.Content>{children}</S.Content>
    </S.Background>
  );
};

const S = {
  Background: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;

    background-color: ${({ theme }) => theme.colors.gray[900]};
    z-index: 100;
    opacity: 0.6;
  `,
  Content: styled.div`
    position: relative;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    z-index: 101;
  `,
};
