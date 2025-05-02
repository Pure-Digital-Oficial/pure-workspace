import { Box, Button, Stack } from '@mui/material';
import { FC } from 'react';
import { useApp } from '../../contexts';
import { scrollToService } from '../../services';
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

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
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
      <Stack spacing={2} direction="row">
        {listOfSinkerTexts.map((button) => (
          <Button
            onClick={() => scrollToService(button.to)}
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
    </Box>
  );
};
