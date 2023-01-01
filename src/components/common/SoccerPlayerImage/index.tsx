import {
  ImageWithFallback,
  ImageWithFallbackProps,
} from 'src/components/ui/Image/ImageWithFallback';
import { soccerImageDefaultSrc } from 'src/useCases/matchRecordCase';

export interface SoccerPlayerImageProps
  extends Omit<ImageWithFallbackProps, 'fallbackSrc'> {
  // matchDto: unknown;
}

// 축구선수와 묶은 Component 오로지 축구선수의 이미지만 보여주며 src는 props에 의존한다.
export const SoccerPlayerImage = ({
  // matchDto,
  src,
  width = 70,
  height = 70,
}: SoccerPlayerImageProps) => {
  return (
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
  );
};
