import { Box, Button, Stack } from '@mui/material';
import { useApp } from '../../contexts';

export const LandingPageHeader = () => {
  const { company } = useApp();

  const listOfSinkerTexts = ['Home', 'Serviços', 'Contato', 'Blog', 'Login'];

  return (
    <Box
      sx={{
        backgroundColor: '#181818',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '4rem',
      }}
    >
      <Box
        component="img"
        height="37px"
        width="163px"
        src={company?.logoAndText}
      />
      <Stack spacing={2} direction="row">
        {listOfSinkerTexts.map((buttons) => (
          <Button
            sx={{
              color: '#F8F9FF',
              textTransform: 'none',
              textAlign: 'end',
              height: '25px',
            }}
          >
            {buttons}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
