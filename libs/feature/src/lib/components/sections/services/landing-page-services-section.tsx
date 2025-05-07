import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ServicesCard } from '../../cards';

export const LandingPageServicesSection = () => {
  const theme = useTheme();
  //const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  //const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Box component="section" id="services">
      <Stack
        direction={mdDown ? 'column' : 'row'}
        sx={{
          background: 'linear-gradient(to bottom, #181818, #C91517)',
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Stack direction="column">
          <Typography
            sx={{
              position: 'relative',
              backgroundColor: '#C91517',
              padding: '0.5rem 2rem',
              color: '#fff',
              fontWeight: 600,
              fontSize: '48px',
              //transform: 'rotate(-4deg)',
            }}
          >
            Nossos Serviços
          </Typography>
          <ServicesCard />
        </Stack>
      </Stack>
    </Box>
  );
};
