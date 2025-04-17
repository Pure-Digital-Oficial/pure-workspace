import { Box } from '@mui/material';
import { FormWithImageLayout } from '../../layouts';
import { AuthImage } from '../../images';
import { LoginForm } from '../../forms';
import { FC } from 'react';

interface LoginDesktopContainerProps {
  image: string;
}

export const LoginDesktopContainer: FC<LoginDesktopContainerProps> = ({
  image,
}) => {
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
