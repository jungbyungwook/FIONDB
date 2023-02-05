import { useAtomValue } from 'jotai';

import { mediaAtom } from 'src/atoms/device';
import { DEVICE } from 'src/constants/device';
import theme from 'src/style/theme';
import { Badge } from './Badge';

const MVP_TEXT = 'MVP';

interface Props {
  isMine: boolean;
}

export const MvpBadge = ({ isMine }: Props) => {
  const media = useAtomValue(mediaAtom);

  const colors = theme.colors;
  const color = isMine ? colors.gray[900] : colors.gray[300];
  const backgroundColor = isMine ? colors.green.fionGreen : colors.gray[800];

  return (
    <Badge
      center={MVP_TEXT}
      color={color}
      backgroundColor={backgroundColor}
      width={media === DEVICE.mobile ? 30 : undefined}
      height={media === DEVICE.mobile ? 18 : undefined}
    />
  );
};
