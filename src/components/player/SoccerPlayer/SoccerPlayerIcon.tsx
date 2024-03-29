import {
  ImageWithFallback,
  ImageWithFallbackProps,
} from 'src/components/common/Image/ImageWithFallback';

interface SoccerPlayerIconProps extends ImageWithFallbackProps {}

export const SoccerPlayerIcon = ({
  fallbackSrc,
  src,
}: SoccerPlayerIconProps) => {
  return <ImageWithFallback fallbackSrc={fallbackSrc} src={src} />;
};
