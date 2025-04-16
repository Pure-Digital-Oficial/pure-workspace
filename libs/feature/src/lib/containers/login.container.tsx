import { Box } from '@mui/material';
import { FormWithImageLayout, LoginForm, AuthImage } from '../components';
import { FC } from 'react';

interface LoginContainerProps {
  image: string;
}

export const LoginContainer: FC<LoginContainerProps> = ({ image }) => {
  return (
    <FormWithImageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <AuthImage image={image} />
        <LoginForm />
      </Box>
    </FormWithImageLayout>
  );
};
