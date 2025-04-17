import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { authService } from '../../services';
import { InputField } from '../inputs';

interface LoginFormProps {
  inputBackground?: string;
  inputColor?: string;
  inputPlaceholderColor?: string;
  title?: {
    text?: string;
    color?: string;
  };
  label?: {
    emailText?: string;
    passwordText?: string;
    labelColor?: string;
  };
  placeholder?: {
    password?: string;
    email?: string;
  };
  button?: {
    title: string;
  };
  iconsColor?: string;
  iconPasswordColor?: string;
}

export const LoginForm: FC<LoginFormProps> = ({
  inputBackground = '#202024',
  inputColor = '#FFF',
  inputPlaceholderColor = '#7C7C8A',
  title = {
    text: 'Login',
    color: '#C91517',
  },
  label = {
    emailText: 'Endereço de e-mail',
    passwordText: 'Sua Senha',
    labelColor: '#B1B1B1',
  },
  iconsColor = '#7C7C8A',
  iconPasswordColor = 'white',
  placeholder = {
    password: '********',
    email: 'exemplo@puredigital.com',
  },
  button = {
    title: 'Entrar na plataforma',
  },
}) => {
  const router = useRouter();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const inputStyle = useMemo(
    () => ({
      borderRadius: '4px',
      background: inputBackground,
      '& .MuiInputBase-input': {
        color: inputColor,
      },
      '& .MuiInputBase-input::placeholder': {
        color: inputPlaceholderColor,
      },
      width: '412px',
      marginBottom: '10px',
    }),
    [inputBackground, inputColor, inputPlaceholderColor]
  );

  const labelStyle = useMemo(
    () => ({
      color: label.labelColor,
      marginBottom: '3px',
    }),
    [label.labelColor]
  );

  const redirect = (event: FormEvent) => {
    event.preventDefault();
    authService
      .login({
        email: values.email,
        password: values.password,
        appId: '1',
      })
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        console.log(err);
        alert('Usuário ou a senha estão inválidos');
      });
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '66.5%',
      }}
    >
      <Typography
        marginBottom="20px"
        fontSize="42px"
        variant="h1"
        fontWeight="800"
        color={title.color}
      >
        {title.text}
      </Typography>
      <Box
        component="form"
        onSubmit={redirect}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <InputField
          id="email"
          name="email"
          label={label.emailText}
          placeholder={placeholder.email}
          value={values.email}
          onChange={handleChange}
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          startIcon={<MailOutlineIcon sx={{ color: iconsColor }} />}
        />

        <InputField
          id="password"
          name="password"
          label={label.passwordText}
          placeholder={placeholder.password}
          value={values.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          startIcon={<LockOutlinedIcon sx={{ color: iconsColor }} />}
          endIcon={
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? (
                <VisibilityOff sx={{ color: iconPasswordColor }} />
              ) : (
                <Visibility sx={{ color: iconPasswordColor }} />
              )}
            </IconButton>
          }
        />
        <Button
          sx={{
            marginTop: '20px',
            height: '65px',
            textTransform: 'none',
            fontSize: '24px',
          }}
          variant="contained"
          type="submit"
        >
          {button.title}
        </Button>
      </Box>
    </Box>
  );
};
