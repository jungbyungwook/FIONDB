import type { ReactNode } from 'react';
import styled from 'styled-components';

import {
  ImageWithFallback,
  ImageWithFallbackProps,
} from 'src/components/common/Image/ImageWithFallback';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';

type RadiusType = 'circle' | 'square';
export interface SoccerPlayerImageProps
  extends Omit<ImageWithFallbackProps, 'fallbackSrc'> {
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  isMine?: boolean;
  type?: RadiusType;
}

// 축구선수와 묶은 Component 오로지 축구선수의 이미지만 보여주며 src는 props에 의존한다.
export const SoccerPlayerImage = ({
  top,
  left,
  right,
  bottomLeft,
  bottomRight,
  isMine = false,
  type = 'circle',
  src,
  width = 70,
  height = 70,
}: SoccerPlayerImageProps) => {
  return (
    <S.Container>
      <S.TopAbsolute>{top}</S.TopAbsolute>
      <S.Border isMine={isMine} type={type}>
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
      </S.Border>
      <S.CenterAbsolute>
        {left}
        {right}
      </S.CenterAbsolute>
      <S.BottomAbsolute>
        {bottomLeft}
        {bottomRight}
      </S.BottomAbsolute>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    position: relative;
  `,
  Border: styled.div<{ isMine: boolean; type: RadiusType }>`
    position: relative;
    width: fit-content;
    border: ${({ theme, isMine }) =>
      isMine
        ? `1px solid ${theme.colors.green[600]}`
        : `1px solid ${theme.colors.gray[600]}`};
    border-radius: ${({ type }) => (type === 'circle' ? '50%' : null)};
    overflow: hidden;
  `,
  TopAbsolute: styled.div`
    position: absolute;
    left: -30%;
    z-index: 2;
  `,
  CenterAbsolute: styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: absolute;
    top: 43%;
    z-index: 2;
  `,
  BottomAbsolute: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: absolute;
    top: 85%;
  `,
};
