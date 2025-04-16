import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { authService } from '../../services';

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

  const inputStyle = {
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
  };

  const labelStyle = {
    color: label.labelColor,
    marginBottom: '3px',
  };

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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }
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
        <label style={labelStyle} htmlFor="email">
          {label.emailText}
        </label>
        <TextField
          id="email"
          name="email"
          variant="outlined"
          placeholder={placeholder.email}
          value={values.email}
          onChange={handleChange}
          sx={inputStyle}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon sx={{ color: iconsColor }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <label style={labelStyle} htmlFor="password">
          {label.passwordText}
        </label>
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder.password}
          value={values.password}
          onChange={handleChange}
          sx={inputStyle}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: iconsColor }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    aria-label={
                      showPassword ? 'Esconder a Senha' : 'Mostrar a Senha'
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: iconPasswordColor }} />
                    ) : (
                      <Visibility sx={{ color: iconPasswordColor }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
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
