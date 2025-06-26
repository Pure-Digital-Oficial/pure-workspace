import { useMediaQuery, useTheme } from '@mui/material';
import { LoginDesktopContainer, LoginMobileContainer } from '../components';

export const LoginContainer = () => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      {lgDown && <LoginMobileContainer />}
      {lgUp && <LoginDesktopContainer />}
    </>
  );
};
