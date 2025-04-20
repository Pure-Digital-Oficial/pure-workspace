import { FC } from 'react';
import { useThemeContext } from '../../contexts';
import { ThemeBase } from '../../utils';
import { ThemeSwitch } from '../switchs';
import { MenuItem, Select, Stack } from '@mui/material';

interface ThemeControlsProps {
  themesList?: {
    label: string;
    value: string;
  }[];
}

export const ThemeControls: FC<ThemeControlsProps> = ({
  themesList = [
    { label: 'Vermelho', value: 'red' },
    { label: 'Verde', value: 'green' },
  ],
}) => {
  const { base, setBase, toggleMode } = useThemeContext();

  return (
    <Stack direction="row" alignItems="center" spacing={2} p={2}>
      <Select
        value={base}
        onChange={(e) => setBase(e.target.value as ThemeBase)}
      >
        {themesList &&
          themesList.map((theme) => (
            <MenuItem key={theme.label} value={theme.value}>
              {theme.label}
            </MenuItem>
          ))}
      </Select>
      <ThemeSwitch onChange={toggleMode} defaultChecked />
    </Stack>
  );
};
