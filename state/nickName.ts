import { atom } from 'recoil';

const nickNameState = atom({
  key: 'nickNameState',
  default: '호날두',
});

export default nickNameState;
