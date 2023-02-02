import { atom } from 'jotai';
import { DeviceType, DEVICE } from 'src/constants/device';

export const mediaAtom = atom<DeviceType>(DEVICE.pc);
