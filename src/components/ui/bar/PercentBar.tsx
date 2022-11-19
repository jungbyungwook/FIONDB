// import { SpawnOptions } from 'child_process';
// import { Attributes } from 'react';
import styled from 'styled-components';

interface Props {
  style: {
    width: string | number;
    backgroundColor: string;
  };
  value?: string | number;
}

export const PercentBar = ({ style, value }: Props) => {
  return <StyledInlineBlock {...style}>{value}</StyledInlineBlock>;
};

const StyledInlineBlock = styled.span<{
  width?: string | number;
  backgroundColor?: string;
}>`
  display: inline-block;
  padding-left: 2rem;
  width: ${({ width }) => (width ? Number(width) + '%' : '5%')};
  height: 100%;
  font-size: 1.1rem;
  line-height: 170%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : null};
`;
