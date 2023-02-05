import { media } from 'src/style/media';
import 'styled-components';
import { DefaultTheme } from 'styled-components';

import { colors } from './color';
import { fontSizes } from './font';

type Colors = typeof colors;
type FontSizes = typeof fontSizes;
type Media = typeof media;

const theme: DefaultTheme = {
  colors,
  fontSizes,
  media,
};

export type { Colors, FontSizes, Media };
export default theme;
