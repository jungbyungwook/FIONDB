import 'styled-components';
import type { Colors, FontSizes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    fontSizes: FontSizes;
  }
}
