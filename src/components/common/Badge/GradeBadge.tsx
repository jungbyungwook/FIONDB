import { ImageWithFallback } from 'src/components/ui/Image/ImageWithFallback';
import theme from 'src/style/theme';
import { Badge } from './Badge';

interface Props {
  spGrade?: number;
}

export const GradeBadge = ({ spGrade }: Props) => {
  const gradeColor = theme.colors.grade;

  const color =
    !spGrade || spGrade < 5 ? theme.colors.gray[100] : theme.colors.gray[900];
  const backgroundColor = !spGrade
    ? undefined
    : spGrade < 2
    ? gradeColor.common
    : spGrade < 5
    ? gradeColor.bronze
    : spGrade < 8
    ? gradeColor.silver
    : gradeColor.gold;

  return (
    <Badge
      center={spGrade}
      color={color}
      backgroundColor={backgroundColor}
      width={22}
      height={22}
    />
  );
};
