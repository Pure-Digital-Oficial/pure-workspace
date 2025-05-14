import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ServicesCard } from '../../cards';
import { ServicesResponseDto } from '@pure-workspace/domain';
import { FC } from 'react';

interface LandingPageServicesSectionProps {
  servicesList: ServicesResponseDto[];
}

export const LandingPageServicesSection: FC<
  LandingPageServicesSectionProps
> = ({ servicesList }) => {
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
        <Stack
          sx={{ display: 'flex', alignItems: 'center' }}
          gap={6}
          direction="column"
        >
          <Typography
            sx={{
              position: 'relative',
              backgroundColor: '#C91517',
              padding: '0.5rem 2rem',
              color: '#fff',
              fontWeight: 600,
              fontSize: '48px',
              maxWidth: '465px',
              //transform: 'rotate(-4deg)',
            }}
          >
            Nossos Serviços
          </Typography>
          <Stack direction="row" spacing={2}>
            {servicesList.map((service) => (
              <ServicesCard
                key={service.id}
                buttonAction={() => {
                  console.log('Clicou');
                }}
                title={service.title}
                image={service.image}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
