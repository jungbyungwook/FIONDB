import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import theme from 'src/style/theme';
import { Badge } from './Badge';

interface Props {
  spGrade?: number;
}

export const GradeBadge = ({ spGrade }: Props) => {
  const color = theme.colors;

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
