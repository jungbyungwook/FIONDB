import { Button } from './Button/Button';
import ReStartSVG from 'src/assets/svg/restart_alt.svg';

const text = '전적갱신';

export const RefetchButton = () => {
  return <Button center={text} right={<ReStartSVG />} />;
};
