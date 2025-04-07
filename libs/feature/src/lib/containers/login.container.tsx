import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { authService } from '../services';

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
  );
};
