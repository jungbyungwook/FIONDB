import { ReactNode } from 'react';
import styled from 'styled-components';

/*
export interface FlexBoxProps {
  children: ReactNode;
  style: {
    flexDirection?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  };
}
// 동일하게 flex를 부여할 수 있고 top, left,right, bottom에 붙일 수 있는 component
const FlexBox = ({ children, style }: FlexBoxProps) => {
  return (
    <FlexContainer
      flexDirection={style?.flexDirection ? style.flexDirection : undefined}
    >
      {children}
    </FlexContainer>
  );
};

const FlexContainer = styled.div<{ flexDirection?: string }>`
  width: 100%;
  height: 100%;
  display: Flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : null};
  overflow: hidden;
`;



export default FlexBox;

*/
