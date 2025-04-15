import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface FormWithImageLayoutProps {
  children: ReactNode;
  background?: string;
}

export const FormWithImageLayout: FC<FormWithImageLayoutProps> = ({
  children,
  background = 'linear-gradient(to bottom, #C91517 0%, #AA1214 50%, #751011 100%)',
}) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: background,
      }}
    >
      <Box
        sx={{
          width: '1093px',
          height: '625px',
          background: 'white',
          borderTopLeftRadius: '18px',
          borderBottomLeftRadius: '18px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
