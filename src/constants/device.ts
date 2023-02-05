type ValueOf<T> = T[keyof T];

export const DEVICE = {
  pc: 'pc',
  mobile: 'mobile',
} as const;

export type DeviceType = ValueOf<typeof DEVICE>;
