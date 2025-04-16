import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface AuthImageProps {
  background?: string;
  color?: string;
  title?: string;
  image: string;
}

export const AuthImage: FC<AuthImageProps> = ({
  background = '#171718',
  color = 'white',
  title = 'Bem-vindo à Pure Digital',
  image,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '367px',
        height: '100%',
        background: background,
        borderTopLeftRadius: '16px',
        borderBottomLeftRadius: '16px',
        color: color,
      }}
    >
      <Box
        sx={{
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Box
          component="img"
          src={image}
          sx={{ width: '164px', height: '163px', marginBottom: '16px' }}
        />
        <Typography fontSize="17px">{title}</Typography>
      </Box>
    </Box>
  );
};
