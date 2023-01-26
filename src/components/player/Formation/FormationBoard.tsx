import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const FormationBoard = ({ children }: Props) => {
  return (
    <S.FormationBoard>
      <S.BoardTitle>스쿼드 정보</S.BoardTitle>
      <S.BoardTable>선수가치 총합등이 들어갈 부분</S.BoardTable>
      {children}
      <S.BoardFooter>
        <S.BoardFooterTitle>교체선수</S.BoardFooterTitle>
      </S.BoardFooter>
    </S.FormationBoard>
  );
};

const S = {
  FormationBoard: styled.div`
    height: 100rem;
    background-color: ${({ theme }) => theme.colors.gray[900]};
    border-radius: 1rem;
  `,
  BoardTitle: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98%;
    height: 5rem;
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[600]};
  `,
  BoardTable: styled.div`
    height: 10rem;
  `,
  BoardFooter: styled.div`
    height: 20rem;
  `,
  BoardFooterTitle: styled.div`
    font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
    text-align: center;
    margin-top: 2.4rem;
  `,
};
