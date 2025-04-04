import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

export const LoginContainer = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const redirect = () => {
    router.push('/home');
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
      <form>
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
        <button onClick={redirect}>Ir para Home</button>
      </form>
    </div>
  );
};
