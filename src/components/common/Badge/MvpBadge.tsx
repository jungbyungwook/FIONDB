import theme from 'src/style/theme';
import { Badge } from './Badge';

export const MvpBadge = () => {
  const colors = theme.colors;

  return (
    <Badge
      center={'MVP'}
      color={colors.gray[900]}
      backgroundColor={colors.green.fionGreen}
    />
  );
};
