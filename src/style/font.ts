// 반응형 디자인을 위한 픽셀 컨버팅 함수

import { pixelToRem } from './util';

// font size를 객체로 반환해주자.
export const fontSizes = {
  title: {
    1: pixelToRem(54),
    2: pixelToRem(48),
    3: pixelToRem(40),
    4: pixelToRem(32),
    5: pixelToRem(28),
  },
  subTitle: {
    24: pixelToRem(24),
    20: pixelToRem(20),
    18: pixelToRem(18),
  },
  content: {
    16: pixelToRem(16),
    14: pixelToRem(14),
    12: pixelToRem(12),
  },
};
