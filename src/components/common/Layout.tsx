import { ReactNode } from 'react';
import styled from 'styled-components';

export const Layout = ({ children }: { children?: ReactNode }) => {
  return <StyleLayout>{children}</StyleLayout>;
};

const StyleLayout = styled.div`
  padding-top: 10rem;

  @media ${({ theme }) => theme.media.small} {
    padding-top: 5.6rem;
  }
`;
