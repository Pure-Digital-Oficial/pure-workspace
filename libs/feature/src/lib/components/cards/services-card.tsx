import { Box, Button, Stack, Typography } from '@mui/material';

export const ServicesCard = () => {
  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F3F3',
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
        src="/Pure_Digital_Icone_Power_BI.svg"
      />
      <Typography fontSize="22px" fontWeight={600}>
        Power BI e Dashboards
      </Typography>

      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          width: '154px',
          fontSize: '16px',
          borderRadius: '9px',
        }}
      >
        Saiba mais
      </Button>
    </Stack>
  );
};
