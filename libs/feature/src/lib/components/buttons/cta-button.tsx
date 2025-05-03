import { Button } from '@mui/material';
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
  const redirect = () => {
    navigateToWathsService(phone, phoneMessage);
  };

  return (
    <Button
      onClick={redirect}
      variant="contained"
      sx={{
        maxWidth: '376px',
        borderRadius: '20px',
        textTransform: 'none',
      }}
    >
      {title}
    </Button>
  );
};
