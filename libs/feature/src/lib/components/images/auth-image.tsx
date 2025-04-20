import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.spacing(46),
        height: mdDown ? '40%' : '100%',
        background: background,
        borderTopLeftRadius: '1rem',
        borderBottomLeftRadius: '1rem',
        color: color,
      }}
    >
      <Box
        sx={{
          height: mdDown ? theme.spacing(25) : theme.spacing(35),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Box
          component="img"
          src={image}
          sx={{
            width: '164px',
            height: '163px',
            marginBottom: theme.spacing(2),
          }}
        />

        <Typography fontSize="17px">{title}</Typography>
      </Box>
    </Box>
  );
};
