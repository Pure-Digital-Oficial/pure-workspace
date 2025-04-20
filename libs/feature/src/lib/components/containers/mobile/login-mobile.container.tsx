import { Box } from '@mui/material';
import { FC } from 'react';
import { LoginForm } from '../../forms';
import { AuthImage } from '../../images';

interface LoginMobileContainerProps {
  image: string;
}

export const LoginMobileContainer: FC<LoginMobileContainerProps> = ({
  image,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <AuthImage background="" color="#C91517" image={image} />
      <LoginForm title={{}} />
    </Box>
  );
};
