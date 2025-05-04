import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { CtaButton } from '../../buttons';

interface LadingPageHeroSectionProps {
  title: ReactNode;
  subTitle: ReactNode;
  image: string;
  backgroundColor?: string;
  textColor?: string;
}

export const LandingPageHeroSection: FC<LadingPageHeroSectionProps> = ({
  subTitle,
  title,
  image,
  backgroundColor = '#181818',
  textColor = '#FFFFFF',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box component="section" id="home">
      <Stack
        direction={mdDown ? 'column' : 'row'}
        spacing={mdDown ? 3 : lgDown ? 2 : 15}
        sx={{
          backgroundColor: backgroundColor,
          display: 'flex',
          justifyContent: 'center',
          alignItems: mdDown ? '' : 'center',
          padding: mdDown ? '1rem' : lgDown ? '3rem' : '6rem',
        }}
      >
        <Stack
          spacing={smDown ? 2 : 5}
          direction="column"
          sx={{
            maxWidth: '498px',
            color: textColor,
          }}
        >
          <Typography
            fontStyle="italic"
            fontSize={smDown ? '30px' : '50px'}
            fontWeight={500}
            lineHeight={smDown ? '35px' : '55px'}
          >
            {title}
          </Typography>
          <Typography fontSize={smDown ? '18px' : '24px'} fontWeight={400}>
            {subTitle}
          </Typography>
          <CtaButton />
        </Stack>
        <Box
          sx={{ display: 'flex', alignSelf: 'center' }}
          component="img"
          width={smDown ? '100%' : mdDown ? '80%' : lgDown ? '540px' : 'auto'}
          src={image}
        />
      </Stack>
    </Box>
  );
};
