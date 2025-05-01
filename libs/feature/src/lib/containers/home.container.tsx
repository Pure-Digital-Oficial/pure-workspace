import { Box } from '@mui/material';
import { ThemeControls } from '../components';
import { useSession } from '../contexts';

export const HomeContainer = () => {
  const { session } = useSession();
  return (
    <Box>
      <ThemeControls />
      <pre>{session?.id}</pre>
    </Box>
  );
};
