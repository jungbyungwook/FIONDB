import styled, { keyframes } from 'styled-components';

export const renderDownIntoUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 30%, 0);
  }
  100% {
    opacity: 1;
    transform: translateZ(0)
  }
`;

export const renderBubble = keyframes`
`;

export const StyleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyleWrap = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 0.5rem;
`;
export const StyleContainer = styled.div<{
  backgroundColor?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 100%;
  height: 18rem;

  color: white;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.gray[900]};
  animation: ${renderDownIntoUp} 0.5s;
`;

export const StyleResultBar = styled.div<{
  isWin: boolean;
}>`
  width: 0.8rem;
  background-color: ${({ theme, isWin }) =>
    isWin ? theme.colors.green.fionGreen : theme.colors.gray[600]};
`;

export const StyleTop = styled.div`
  display: flex;
  justify-content: center;
  height: 85%;

  padding-left: 2rem;
`;

export const StyleBottom = styled.div`
  height: 15%;
`;

export const StyleCenter = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyleLeft = styled.div`
  display: flex;
  flex: 2;
  justify-content: start;
  align-items: center;
  gap: 2rem;
`;
export const StyleRight = styled.div`
  display: flex;
  flex: 2;
  justify-content: end;
  align-items: center;
  gap: 2rem;
`;

export const StyleResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  height: 100%;
`;

export const StyleResultTitle = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;

export const StyleMatchType = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.content[14]};
  margin-bottom: 0.6rem;
`;

export const StyleMatchResult = styled.div<{ isWin: boolean }>`
  color: ${({ theme, isWin }) => isWin && theme.colors.green.fionGreen};
  font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray[600]}`};
  padding-bottom: 1rem;
`;
export const StyleMatchDate = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.content[14]};
`;

export const StyleGoalsWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const StyleGoals = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.title[5]};
`;

export const StyleVS = styled.div``;

export const StyleLeftPlayer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;
export const StyleRightPlayer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;
export const StyleDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-basis: 4.5rem;
  height: 80%;
  border-left: ${({ theme }) => `1px solid ${theme.colors.gray[600]}`};
  opacity: 0.8;
  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;
export const StyleRotateWrap = styled.div<{ isClick: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  transform: ${({ isClick }) => (isClick ? 'rotate(0)' : 'rotate(180deg)')};
`;

// import styled from 'styled-components';

export const MatchResultText = styled.div<{ resultType: '승리' | '패배' }>`
  font-size: ${({ theme }) => theme.fontSizes.subTitle[24]};
  font-weight: bold;
  color: ${({ theme, resultType }) =>
    resultType === '승리'
      ? theme.colors.green.fionGreen
      : theme.colors.gray[100]};
`;

export const MatchGoalText = styled.h1``;
