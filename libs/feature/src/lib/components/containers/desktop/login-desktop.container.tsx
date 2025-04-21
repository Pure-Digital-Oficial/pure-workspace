import { Box } from '@mui/material';
import { FormWithImageLayout } from '../../layouts';
import { AuthImage } from '../../images';
import { LoginForm } from '../../forms';

export const LoginDesktopContainer = () => {
  return (
    <FormWithImageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <AuthImage />

        <LoginForm />
      </Box>
    </FormWithImageLayout>
  );
};
