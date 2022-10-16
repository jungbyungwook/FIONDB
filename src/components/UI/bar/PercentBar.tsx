import { SpawnOptions } from 'child_process';
import { Attributes } from 'react';
import styled from 'styled-components';

interface Props {
  style?: {
    width: string | number;
    backgroundColor: string;
  };
  value?: string | number;
}

const PercentBar = ({ style, value }: Props) => {
  return <StyledInlineBlock {...style}>{value}</StyledInlineBlock>;
};

export default PercentBar;

const StyledInlineBlock = styled.span<{
  width?: string | number;
  backgroundColor?: string;
}>`
  display: inline-block;
  width: ${({ width }) => (width ? Number(width) - 1 + '%' : '5%')};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : null};
`;
