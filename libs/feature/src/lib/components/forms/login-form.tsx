import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const inputStyle = useMemo(
    () => ({
      borderRadius: theme.spacing(0.5),
      background: inputBackground,
      '& .MuiInputBase-input': {
        color: inputColor,
      },
      '& .MuiInputBase-input::placeholder': {
        color: inputPlaceholderColor,
      },
      width: mdDown ? '100%' : theme.spacing(51.5),
      marginBottom: theme.spacing(1.25),
    }),
    [inputBackground, inputColor, inputPlaceholderColor, theme, mdDown]
  );

  const labelStyle = useMemo(
    () => ({
      color: label.labelColor,
      marginBottom: theme.spacing(0.75),
    }),
    [label.labelColor, theme]
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
        width: mdDown ? '100%' : '66.5%',
      }}
    >
      {title && (
        <Typography
          marginBottom={theme.spacing(2.5)}
          fontSize="2.65rem"
          variant="h1"
          fontWeight="800"
          color={title.color}
        >
          {title.text}
        </Typography>
      )}
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
            marginTop: theme.spacing(2.5),
            height: theme.spacing(8),
            textTransform: 'none',
            fontSize: '1.5rem',
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
