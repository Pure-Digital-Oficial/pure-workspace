import {
  Box,
  Button,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';
import { useApp } from '../../contexts';
import { ButtonNavigation } from '../../utils';

interface LandingPageHeaderProps {
  backgroundColor?: string;
  buttonTextColor?: string;
  listOfSinkerTexts: ButtonNavigation[];
}

export const LandingPageHeader: FC<LandingPageHeaderProps> = ({
  backgroundColor = '#181818',
  buttonTextColor = '#F8F9FF',
  listOfSinkerTexts,
}) => {
  const { company } = useApp();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        display: 'flex',
        justifyContent: mdDown ? 'space-between' : 'center',
        padding: '1rem',
        paddingTop: mdDown ? '3rem' : 'auto',
        paddingBottom: mdDown ? '3rem' : 'auto',
        alignItems: mdDown ? 'center' : 'end',
        height: '4rem',
      }}
    >
      <Box
        component="img"
        height="37px"
        width="163px"
        marginRight="2rem"
        src={company?.logoAndText}
      />
      {!mdDown && (
        <Stack spacing={2} direction="row">
          {listOfSinkerTexts.map((button, index) => (
            <Button
              key={`${button.title}-${index}`}
              onClick={button.to}
              sx={{
                color: buttonTextColor,
                textTransform: 'none',
                textAlign: 'end',
                height: '25px',
                whiteSpace: 'nowrap',
                fontWeight: 600,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              {button.title}
            </Button>
          ))}
        </Stack>
      )}
      {mdDown && (
        <IconButton>
          <MenuIcon
            fontSize="small"
            sx={{ color: 'white', height: '40px', width: '40px' }}
          />
        </IconButton>
      )}
    </Box>
  );
};
