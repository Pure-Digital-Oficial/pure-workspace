export const themesList = ['purple', 'red'] as const;

export type ThemeColorsType = (typeof themesList)[number];
