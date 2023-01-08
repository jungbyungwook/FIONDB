import theme from 'src/style/theme';
import { Badge } from './Badge';

const MVP_TEXT = 'MVP';

interface Props {
  isMine: boolean;
}

export const MvpBadge = ({ isMine }: Props) => {
  const colors = theme.colors;
  const color = isMine ? colors.gray[900] : colors.gray[300];
  const backgroundColor = isMine ? colors.green.fionGreen : colors.gray[800];

  return (
    <Badge center={MVP_TEXT} color={color} backgroundColor={backgroundColor} />
  );
};
