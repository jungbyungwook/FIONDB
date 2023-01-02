import 'styled-components';
import { DefaultTheme } from 'styled-components';

import { colors } from './color';
import { fontSizes } from './font';

type Colors = typeof colors;
type FontSizes = typeof fontSizes;

const theme: DefaultTheme = {
  colors,
  fontSizes,
};

export type { Colors, FontSizes };
export default theme;
