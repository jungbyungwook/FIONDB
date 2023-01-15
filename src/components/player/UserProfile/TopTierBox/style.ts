import styled from 'styled-components';

export const TopTierWrap = styled.div`
  text-align: center;
`;

export const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3rem;
  font-size: ${({ theme }) => theme.fontSizes.subTitle[18]};
`;

export const FlexItem = styled.div<{ alignSelf?: 'start' | 'center' | 'end' }>`
  align-self: ${({ alignSelf }) => alignSelf && alignSelf};
`;

export const TopTierTitle = styled.div`
  margin-bottom: 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes.content[16]};
`;

export const TopTierMode = styled.div`
  height: 30%;
  margin-top: 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes.subTitle[20]};
`;
