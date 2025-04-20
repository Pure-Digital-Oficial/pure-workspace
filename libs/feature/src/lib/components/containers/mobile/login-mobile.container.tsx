import { Box } from '@mui/material';
import { LoginForm } from '../../forms';
import { AuthImage } from '../../images';

export const LoginMobileContainer = () => {
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
      <AuthImage background="" color="#C91517" />
      <LoginForm title={{}} />
    </Box>
  );
};
