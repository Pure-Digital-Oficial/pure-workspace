import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { authService } from '../services';
import { Box, Typography } from '@mui/material';
import { FormWithImageLayout } from '../components';

export const LoginContainer = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

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
        <Box>
          {' '}
          <h1>Login</h1>
          <form onSubmit={redirect}>
            <input
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <input
              placeholder="Senha"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <button type="submit">Ir para Home</button>
          </form>
        </Box>
      </Box>
    </FormWithImageLayout>
  );
};
