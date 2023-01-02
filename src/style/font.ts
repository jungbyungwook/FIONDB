// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size: number) => `${size / 10}rem`;
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
    large: pixelToRem(24),
    middle: pixelToRem(20),
    small: pixelToRem(18),
  },
  content: {
    large: pixelToRem(16),
    middle: pixelToRem(14),
    small: pixelToRem(12),
  },
};
