import theme from 'src/style/theme';
import { Badge } from './Badge';

interface Props {
  spGrade: number;
}

export const GradeBadge = ({ spGrade }: Props) => {
  const color = theme.colors;
  return (
    <Badge
      center={spGrade}
      color={color.gray[100]}
      backgroundColor={color.gray[900]}
      width={2.2}
      height={2.2}
    />
  );
};
