import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

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
        }}
      >
        <Typography>Nossos Serviços</Typography>
      </Stack>
    </Box>
  );
};
