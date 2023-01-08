import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import theme from 'src/style/theme';
import { Badge } from './Badge';
// import { Badge } from './Badge';

interface Props {
  seasonImageSrc?: string;
}

export const SeasonBadge = ({ seasonImageSrc }: Props) => {
  const color = theme.colors;

  if (seasonImageSrc) {
    return (
      <ImageWithFallback
        src={seasonImageSrc}
        fallbackSrc={seasonImageSrc}
        width={22}
        height={22}
      />
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
