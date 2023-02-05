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
      <S.ImageWrap>
        <ImageWithFallback
          src={seasonImageSrc}
          alt="seson_badge"
          fallbackSrc={seasonImageSrc}
          layout="fill"
        />
      </S.ImageWrap>
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

const S = {
  ImageWrap: styled.div`
    position: relative;
    width: 2.5rem;
    height: 2rem;
    border-radius: 0.3rem;
    overflow: hidden;

    @media ${({ theme }) => theme.media.small} {
      width: 3rem;
      height: 2rem;
    }
  `,
};
