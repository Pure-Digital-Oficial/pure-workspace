import { useSession } from '../contexts';

export const HomeContainer = () => {
  const { session } = useSession();
  return (
    <div>
      <div>Hello home!</div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};
