import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { authService } from '../services';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FormWithImageLayout } from '../components';

export const LoginContainer = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const inputStyle = {
    borderRadius: '4px',
    background: '#202024',
    '& .MuiInputBase-input': {
      color: '#FFF',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#7C7C8A',
    },
    width: '412px',
    marginBottom: '10px',
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
    <FormWithImageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '367px',
            height: '100%',
            background: '#171718',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            color: 'white',
          }}
        >
          <Box
            sx={{
              height: '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <Box
              component="img"
              src="/Pure_Logo_Vermelha.svg"
              sx={{ width: '164px', height: '163px', marginBottom: '16px' }}
            />
            <Typography fontSize="17px">Bem-vindo à Pure Digital</Typography>
          </Box>
        </Box>
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
            color="#C91517"
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={redirect}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <label
              style={{ color: '#B1B1B1', marginBottom: '3px' }}
              htmlFor="email"
            >
              Endereço de e-mail
            </label>
            <TextField
              id="email"
              name="email"
              variant="outlined"
              placeholder="exemplo@puredigital.com"
              value={values.email}
              onChange={handleChange}
              sx={inputStyle}
            />
            <label
              style={{ color: '#B1B1B1', marginBottom: '3px' }}
              htmlFor="password"
            >
              Sua Senha
            </label>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              sx={inputStyle}
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
              Entrar na plataforma
            </Button>
          </Box>
        </Box>
      </Box>
    </FormWithImageLayout>
  );
};
