import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export const FormationBoard = ({ children }: Props) => {
  return (
    <StyleFormationBoard>
      <StyleBoardTitle>스쿼드 정보</StyleBoardTitle>
      <StyleBoardTable>선수가치 총합등이 들어갈 부분</StyleBoardTable>
      {children}
      <StyleBoardFooter>
        <StyleBoardFooterTitle>교체선수</StyleBoardFooterTitle>
      </StyleBoardFooter>
    </StyleFormationBoard>
  );
};

const StyleFormationBoard = styled.div`
  height: 100rem;
  background-color: ${({ theme }) => theme.colors.gray[900]};
  border-radius: 1rem;
`;
const StyleBoardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
  height: 5rem;
  margin: 0 auto;
  font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[600]};
`;

const StyleBoardTable = styled.div`
  height: 10rem;
`;

const StyleBoardFooter = styled.div`
  height: 20rem;
`;

const StyleBoardFooterTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
  text-align: center;
  margin-top: 2.4rem;
`;
