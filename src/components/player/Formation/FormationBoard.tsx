import { ReactNode } from 'react';
import styled from 'styled-components';

import { FormationSubPlayers } from 'src/components/player/Formation/FormationSubPlayers';
import { MatchInfo } from 'src/types/DetailObject';

interface Props {
  children: ReactNode;
  matchDetailData: MatchInfo[];
}

export const FormationBoard = ({ children, matchDetailData }: Props) => {
  return (
    <S.FormationBoard>
      <S.BoardTitle>스쿼드 정보</S.BoardTitle>
      {/* <S.BoardTable> TODO: 선수가치 총합등이 들어갈 부분</S.BoardTable> */}
      {children}
      <S.BoardFooter>
        <S.BoardFooterTitle>교체선수</S.BoardFooterTitle>
        <FormationSubPlayers matchDetailData={matchDetailData} />
      </S.BoardFooter>
    </S.FormationBoard>
  );
};

const S = {
  FormationBoard: styled.div`
    height: 80rem;
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
    margin: 1.6rem 0;
  `,
};
