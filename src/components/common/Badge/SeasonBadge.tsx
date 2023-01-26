import styled from 'styled-components';

import { ImageWithFallback } from 'src/components/common/Image/ImageWithFallback';
import theme from 'src/style/theme';
import { Badge } from './Badge';

interface Props {
  seasonImageSrc?: string;
}

export const SeasonBadge = ({ seasonImageSrc }: Props) => {
  const color = theme.colors;

  if (seasonImageSrc) {
    return (
      <StyleImageWrap>
        <ImageWithFallback
          src={seasonImageSrc}
          fallbackSrc={seasonImageSrc}
          width={25}
          height={20}
        />
      </StyleImageWrap>
    );
  }

  return (
    <Badge
      center={''}
      color={color.gray[100]}
      backgroundColor={color.gray[900]}
      width={22}
      height={22}
    />
  );
};

const StyleImageWrap = styled.div`
  border-radius: 0.3rem;
  overflow: hidden;
`;
