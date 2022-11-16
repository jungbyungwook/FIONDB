import { LiHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  right: ReactNode;
}

const ListItem = ({ children, right, ...props }: Props) => {
  return (
    <StyledLi {...props}>
      {children}
      {right}
    </StyledLi>
  );
};

// 공통적으로 들어가는 style만 지정
const StyledLi = styled.li`
  list-style: none;
`;

export default ListItem;
