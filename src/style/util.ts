import { MatchResultType } from 'src/types/DetailObject';
import { DefaultTheme } from 'styled-components';

const standard = 10;

export const pixelToRem = (size: number) => `${size / standard}rem`;

export const getColorByMatchResult = (
  matchResult: MatchResultType,
  theme: DefaultTheme,
) =>
  matchResult === '승'
    ? theme.colors.green.fionGreen
    : matchResult === '무'
    ? theme.colors.gray[600]
    : theme.colors.position.fw;

export const getBackGroundColorByMatchResult = (
  matchResult: MatchResultType,
  theme: DefaultTheme,
) =>
  matchResult === '승'
    ? theme.colors.green.fionGreen
    : matchResult === '무'
    ? theme.colors.gray[400]
    : theme.colors.position.fw;
