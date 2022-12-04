import { ReactNode } from 'react';
import styled from 'styled-components';

export const Layout = ({ children }: { children?: ReactNode }) => {
  return <StyleLayout>{children}</StyleLayout>;
};

const StyleLayout = styled.div`
  padding-top: 8rem;
`;
