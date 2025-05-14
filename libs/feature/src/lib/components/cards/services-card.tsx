import { Box, Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface ServicesCardProps {
  backgroundColor?: string;
  image: string;
  title: string;
  buttonTitle?: string;
  buttonAction: () => void;
}

export const ServicesCard: FC<ServicesCardProps> = ({
  image,
  title,
  buttonAction,
  backgroundColor = '#F3F3F3',
  buttonTitle = 'Saiba mais',
}) => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        borderRadius: '20px',
        width: '309px',
        height: '280px',
      }}
    >
      <Box
        sx={{
          width: '100px',
          height: '100px',
        }}
        component="img"
        src={image}
        alt={`Image form  ${title}`}
      />
      <Typography fontSize="22px" fontWeight={600}>
        {title}
      </Typography>

      <Button
        variant="contained"
        onClick={buttonAction}
        sx={{
          textTransform: 'none',
          width: '154px',
          fontSize: '16px',
          borderRadius: '9px',
        }}
      >
        {buttonTitle}
      </Button>
    </Stack>
  );
};
