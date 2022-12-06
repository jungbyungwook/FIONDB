import styled from 'styled-components';

interface IBestPlayerBadgeProps {
  type: string;
}
export const BestPlayerBadge = ({ type }: IBestPlayerBadgeProps) => {
  const data = {
    backgroundColors: {
      win: '#C99A19',
      lose: '#7329D8',
    },
    text: {
      win: 'MVP',
      lose: 'ACE',
    },
  };

  return (
    <StyleWrap
      backGroundColor={
        type === '패' ? data.backgroundColors.lose : data.backgroundColors.win
      }
    >
      {type === '패' ? data.text.lose : data.text.win}
    </StyleWrap>
  );
};

const StyleWrap = styled.div<{ backGroundColor: string }>`
  margin: 0 auto;
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.2rem;
  color: white;
  background-color: ${(props) => props.backGroundColor};
`;
