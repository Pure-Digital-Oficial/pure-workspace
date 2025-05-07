import { Button, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { navigateToWathsService } from '../../services';

interface CtaButtonProps {
  title?: string;
  phone?: string;
  phoneMessage?: string;
}

export const CtaButton: FC<CtaButtonProps> = ({
  title = 'Saiba mais',
  phone = '11965004102',
  phoneMessage = 'Olá estou interessado em saber mais sobre os planos da Pure Digital, Poderia me ajudar?',
}) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const redirect = () => {
    navigateToWathsService(phone, phoneMessage);
  };

  return (
    <Button
      onClick={redirect}
      variant="contained"
      sx={{
        width: mdDown ? '194px' : 'auto',
        maxWidth: '376px',
        borderRadius: mdDown ? '9px' : '14px',
        textTransform: 'none',
        fontSize: mdDown ? '16px' : '24px',
        padding: '0.85rem',
      }}
    >
      {title}
    </Button>
  );
};
