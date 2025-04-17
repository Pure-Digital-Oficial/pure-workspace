import { useMediaQuery, useTheme } from '@mui/material';
import { LoginForm, LoginDesktopContainer } from '../components';
import { FC } from 'react';

interface LoginContainerProps {
  image: string;
}

export const LoginContainer: FC<LoginContainerProps> = ({ image }) => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!lgDown && <LoginDesktopContainer image={image} />}
      <LoginForm />
    </>
  );
};
