import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { authService } from '../services';
import { Box } from '@mui/material';

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
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(to bottom, #C91517 0%, #AA1214 50%, #751011 100%)',
      }}
    >
      <Box
        sx={{
          width: '1093px',
          height: '625px',
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: '16px',
          background: 'white',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        asassa
      </Box>
    </Box>
  );
};

/*

    <div>
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
    </div> 
*/
