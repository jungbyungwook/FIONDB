import styled from 'styled-components';

import { ImageWithFallback } from 'src/components/common/Image/ImageWithFallback';

interface Props {
  seasonImageSrc?: string;
  inFormation: boolean;
}

export const SeasonBadge = ({ seasonImageSrc, inFormation }: Props) => {
  if (!seasonImageSrc) {
    return null;
  }

  if (inFormation) {
    return (
      <S.InFormationImageWrap>
        <ImageWithFallback
          src={seasonImageSrc}
          alt="seson_badge"
          fallbackSrc={seasonImageSrc}
          layout="fill"
        />
      </S.InFormationImageWrap>
    );
  } else {
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

  InFormationImageWrap: styled.div`
    position: relative;
    width: 2.5rem;
    height: 2rem;
    border-radius: 0.3rem;
    overflow: hidden;

    @media ${({ theme }) => theme.media.small} {
      width: 1.4rem;
      height: 1.1rem;
    }
  `,
};
