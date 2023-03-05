import Image, { ImageProps } from 'next/image';
import styled from 'styled-components';
import LoadingGIF from 'src/assets/gif/loading.gif';

interface Props {
  width?: number;
  height?: number;
}

export const GoalLoadingSpinner = ({
  width = 80,
  height = 80,
  ...rest
}: Props) => {
  return (
    <S.ImageWrap>
      <Image src={LoadingGIF} width={width} height={height} {...rest}></Image>
    </S.ImageWrap>
  );
};

const S = {
  ImageWrap: styled.div`
    position: relative;
    z-index: 100;
    height: 10rem;
  `,
};
