import ReStartSVG from 'src/assets/svg/restart_alt.svg';
import { Button } from './Button';

const TEXT = '전적갱신';

export const RefetchButton = () => {
  return <Button center={TEXT} right={<ReStartSVG />} />;
};
