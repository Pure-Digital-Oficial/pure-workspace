import { createContext, ReactNode, useContext } from 'react';
import { SessionResponseDto, SessionType } from '@pure-workspace/domain';

const SessionContext = createContext<SessionType>({
  session: null,
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: SessionResponseDto | null;
}) => {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
