import { atom } from 'recoil';
import { PlayerDTO } from 'types/DetailObject';

const userProfileState = atom({
  key: 'userProfileState',
  default: {
    nickName: '기술적반등',
    accessId: '',
  },
});

export default userProfileState;
