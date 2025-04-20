import { useMediaQuery, useTheme } from '@mui/material';
import { LoginDesktopContainer, LoginMobileContainer } from '../components';
import { FC } from 'react';

interface LoginContainerProps {
  image: string;
}

export const LoginContainer: FC<LoginContainerProps> = ({ image }) => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      {lgDown && <LoginMobileContainer image={image} />}
      {lgUp && <LoginDesktopContainer image={image} />}
    </>
  );
};
