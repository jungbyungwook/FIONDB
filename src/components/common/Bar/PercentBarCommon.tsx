import { ReactNode } from 'react';
import styled from 'styled-components';

export interface IPercentBarProps {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
  style: {
    width: string | number;
    backgroundColor: string;
  };
}

export const PercentBarCommon = ({
  left,
  center,
  right,
  style,
}: IPercentBarProps) => {
  return (
    <StyledInlineBlock {...style}>
      <StyleFlex>
        <StyleFlexItem>{left}</StyleFlexItem>
        <StyleFlexItem>{center}</StyleFlexItem>
        <StyleFlexItem>{right}</StyleFlexItem>
      </StyleFlex>
    </StyledInlineBlock>
  );
};

const StyledInlineBlock = styled.span<{
  width?: string | number;
  backgroundColor?: string;
}>`
  display: inline-block;
  width: ${({ width }) => (width ? Number(width) + '%' : '5%')};
  height: 100%;
  font-size: 1.1rem;
  line-height: 170%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : null};
`;

const StyleFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 3rem;
`;
const StyleFlexItem = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.content[14]};
`;
