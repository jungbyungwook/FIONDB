import styled from 'styled-components';

export const TopTierWrap = styled.div`
  height: 100%;
  text-align: center;
  padding: 20px 0;
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
  height: 30%;
  font-size: ${({ theme }) => theme.fontSizes.subTitle[24]};
  margin-bottom: 1.2rem;
`;

export const TopTierMode = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.content[16]};
  margin-top: 1.2rem;
`;
