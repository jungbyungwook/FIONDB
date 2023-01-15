import { PositionCategoryKeyType } from 'src/constants/position';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 1.8rem;
  text-align: center;
`;
export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  font-size: 1.2rem;
  font-weight: 400;
`;

export const Position = styled.div<{
  position?: PositionCategoryKeyType;
}>`
  font-size: ${({ theme }) => theme.fontSizes.content[14]};
  color: ${({ theme, position }) =>
    position === 'fw'
      ? theme.colors.position.fw
      : position === 'mf'
      ? theme.colors.position.mf
      : position === 'df'
      ? theme.colors.position.df
      : null};
`;
export const Status = styled.div``;
export const AbsoluteDiv = styled.div`
  position: absolute;
  left: -28%;
`;
