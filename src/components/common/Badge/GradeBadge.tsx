import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import theme from 'src/style/theme';
import { Badge } from './Badge';

interface Props {
  seasonImageSrc?: string;
  spGrade?: number;
}

export const GradeBadge = ({ seasonImageSrc, spGrade }: Props) => {
  const color = theme.colors;

  console.log(seasonImageSrc);
  if (seasonImageSrc) {
    return (
      <ImageWithFallback
        src={seasonImageSrc}
        // fallbackSrc
        width={22}
        height={22}
      />
    );
  }

  return (
    <Badge
      center={spGrade}
      color={color.gray[100]}
      backgroundColor={color.gray[900]}
      width={22}
      height={22}
    />
  );
};
