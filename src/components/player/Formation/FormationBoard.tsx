import { ReactNode } from 'react';
import styled from 'styled-components';

import { FormationSubPlayers } from 'src/components/player/Formation/FormationSubPlayers';
import { MatchInfo } from 'src/types/DetailObject';
import { PositionCategoryKeyType } from 'src/constants/position';

interface Props {
  children: ReactNode;
  matchDetailData: MatchInfo[];
}

export const FormationBoard = ({ children, matchDetailData }: Props) => {
  return (
    <S.FormationBoard>
      <S.BoardTitle>스쿼드 정보</S.BoardTitle>
      <S.Positions>
        <S.Position position="fw">● FW</S.Position>
        <S.Position position="mf">● MF</S.Position>
        <S.Position position="df">● DF</S.Position>
      </S.Positions>
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

    @media ${({ theme }) => theme.media.small} {
      width: 100%;
      height: 100%;
    }
  `,
  BoardTitle: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98%;
    height: 5rem;
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};

    @media ${({ theme }) => theme.media.small} {
      height: 4rem;
    }
  `,
  Positions: styled.ul`
    display: none;

    @media ${({ theme }) => theme.media.small} {
      display: flex;
      align-items: center;
      height: 4rem;
      padding-left: 2rem;
      gap: 1.2rem;
      list-style: none;
    }
  `,
  Position: styled.li<{ position: PositionCategoryKeyType }>`
    color: ${({ theme, position }) => theme.colors.position[position]};
  `,
  BoardTable: styled.div`
    height: 10rem;
  `,
  BoardFooter: styled.div`
    height: 20rem;

    @media ${({ theme }) => theme.media.small} {
      height: 13rem;
    }
  `,
  BoardFooterTitle: styled.div`
    font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
    text-align: center;
    margin: 1.6rem 0;
  `,
};
