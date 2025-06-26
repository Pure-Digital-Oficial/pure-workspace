import { greenDarkTheme, greenLightTheme } from './green';
import { redDarkTheme, redLightTheme } from './red';

export const themes = {
  red: {
    light: redLightTheme,
    dark: redDarkTheme,
  },
  green: {
    light: greenLightTheme,
    dark: greenDarkTheme,
  },
};

export type ThemeBase = keyof typeof themes;
