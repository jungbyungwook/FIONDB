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

export const StyleContainer = styled.div<{
  backgroundColor: string | undefined;
}>`
  width: 100%;
  /* height: 13rem; */
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${(props) => props.backgroundColor || '#273042'};
  animation: ${renderDownIntoUp} 0.5s;
`;

export const StyleTop = styled.div`
  display: flex;
  justify-content: center;
  height: 85%;
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
export const StyleResultBar = styled.div<{
  backgroundColor: string | undefined;
}>`
  height: 100%;
  width: 0.4rem;
  background-color: ${(props) => props.backgroundColor || '#3351A0'};
`;
export const StyleResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;

export const StyleResultTitle = styled.div`
  text-align: center;
  font-size: 1.2rem;
`;
export const StyleGoals = styled.div`
  font-size: 1.5rem;
`;
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
  height: 100%;
  flex-basis: 2rem;
  background-color: gray;
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
  transform: ${({ isClick }) => (isClick ? 'rotate(0)' : 'rotate(-90deg)')};
`;

// import styled from 'styled-components';

export const MatchResultText = styled.div<{ resultType: '승리' | '패배' }>`
  font-size: ${({ theme }) => theme.fontSizes.subTitle.large};
  font-weight: bold;
  color: ${({ theme, resultType }) =>
    resultType === '승리'
      ? theme.colors.green.fionGreen
      : theme.colors.gray[100]};
`;

export const MatchGoalText = styled.h1``;
