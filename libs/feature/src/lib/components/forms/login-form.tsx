import { useRouter } from 'next/router';
import { FC, useState, useMemo } from 'react';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthDto } from '@pure-workspace/domain';
import { authService } from '../../services';
import { InputField } from '../inputs';
import { useApp } from '../../contexts';
import { LoginSchema } from '../../utils';

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
  const { appId } = useApp();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Omit<AuthDto, 'appId'>>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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

  const redirect = (data: Omit<AuthDto, 'appId'>) => {
    authService
      .login({
        email: data.email,
        password: data.password,
        appId: appId ?? '',
      })
      .then(() => {
        router.push('/home');
      })
      .catch((err) => {
        console.log(err);
        alert('Usuário ou a senha estão inválidos');
      });
  };

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
        onSubmit={handleSubmit(redirect)}
        width={mdDown ? '95%' : 'auto'}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <InputField<Omit<AuthDto, 'appId'>>
          id="email"
          name="email"
          label={label.emailText}
          placeholder={placeholder.email}
          error={!!errors.email}
          helperText={errors.email?.message}
          register={register}
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          startIcon={<MailOutlineIcon sx={{ color: iconsColor }} />}
        />

        <InputField<Omit<AuthDto, 'appId'>>
          id="password"
          name="password"
          label={label.passwordText}
          placeholder={placeholder.password}
          error={!!errors.password}
          helperText={errors.password?.message}
          register={register}
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
            height: mdDown ? theme.spacing(6) : theme.spacing(8),
            textTransform: 'none',
            fontSize: mdDown ? '1rem' : '1.5rem',
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
