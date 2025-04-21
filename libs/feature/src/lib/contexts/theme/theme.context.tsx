import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeMode } from '@pure-workspace/domain';
import { themes, ThemeBase } from '../../utils';

interface ThemeContextProps {
  base: ThemeBase;
  mode: ThemeMode;
  setBase: (base: ThemeBase) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useThemeContext deve estar dentro do ThemeProvider');
  return context;
};

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [base, setBase] = useState<ThemeBase>('red');
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themes[base][mode];

  return (
    <ThemeContext.Provider value={{ base, mode, setBase, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
