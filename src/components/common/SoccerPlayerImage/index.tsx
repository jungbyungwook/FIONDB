import type { ReactNode } from 'react';
import styled from 'styled-components';

import {
  ImageWithFallback,
  ImageWithFallbackProps,
} from 'src/components/ui/Image/ImageWithFallback';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';

type RadiusType = 'circle' | 'square';
export interface SoccerPlayerImageProps
  extends Omit<ImageWithFallbackProps, 'fallbackSrc'> {
  top?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  isMine?: boolean;
  type?: RadiusType;
}

// 축구선수와 묶은 Component 오로지 축구선수의 이미지만 보여주며 src는 props에 의존한다.
export const SoccerPlayerImage = ({
  top,
  bottomLeft,
  bottomRight,
  isMine = false,
  type = 'circle',
  src,
  width = 70,
  height = 70,
}: SoccerPlayerImageProps) => {
  return (
    <StyleContainer>
      <StyleTopAbsolute>{top}</StyleTopAbsolute>
      <StyleBorder isMine={isMine} type={type}>
        <ImageWithFallback
          src={src}
          fallbackSrc={soccerImageDefaultSrc}
          alt="soccer_image"
          width={width}
          height={height}
          objectFit="contain"
          placeholder="blur"
          blurDataURL={soccerImageDefaultSrc}
          loading="lazy"
        />
      </StyleBorder>
      <StyleBottomAbsolute>
        {bottomLeft}
        {bottomRight}
      </StyleBottomAbsolute>
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  position: relative;
`;

const StyleBorder = styled.div<{ isMine: boolean; type: RadiusType }>`
  position: relative;
  width: fit-content;
  border: ${({ theme, isMine }) =>
    isMine
      ? `1px solid ${theme.colors.green[600]}`
      : `1px solid ${theme.colors.gray[600]}`};
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : null)};
  overflow: hidden;
`;

const StyleTopAbsolute = styled.div`
  position: absolute;
  left: -30%;
  z-index: 2;
`;

const StyleBottomAbsolute = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: absolute;
  top: 85%;
`;
