export const ThemesList = ['purple', 'red'] as const;

export type ThemeColorsType = (typeof ThemesList)[number];
