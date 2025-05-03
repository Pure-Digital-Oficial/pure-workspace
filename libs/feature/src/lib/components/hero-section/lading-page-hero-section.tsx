import { Box, Stack, Typography } from '@mui/material';
import { CtaButton } from '../buttons';
import { FC, ReactNode } from 'react';

interface LadingPageHeroSectionProps {
  title: ReactNode;
  subTitle: ReactNode;
  image: string;
  backgroundColor?: string;
  textColor?: string;
}

export const LadingPageHeroSection: FC<LadingPageHeroSectionProps> = ({
  subTitle,
  title,
  image,
  backgroundColor = '#181818',
  textColor = '#FFFFFF',
}) => {
  return (
    <Stack
      direction="row"
      spacing={15}
      sx={{
        backgroundColor: backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6rem',
      }}
    >
      <Stack
        spacing={5}
        direction="column"
        sx={{
          maxWidth: '498px',
          color: textColor,
        }}
      >
        <Typography
          fontStyle="italic"
          fontSize="50px"
          fontWeight={500}
          lineHeight="55px"
        >
          {title}
        </Typography>
        <Typography fontSize="24px" fontWeight={400}>
          {subTitle}
        </Typography>
        <CtaButton />
      </Stack>
      <Box component="img" src={image} />
    </Stack>
  );
};
