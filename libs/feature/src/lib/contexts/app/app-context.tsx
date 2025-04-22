import { createContext, ReactNode, useContext } from 'react';
import { CompanyResponseDto, AppType } from '@pure-workspace/domain';

const AppContext = createContext<AppType>({
  company: null,
  appId: null,
});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({
  children,
  company,
  appId,
}: {
  children: ReactNode;
  company: CompanyResponseDto;
  appId: string;
}) => {
  return (
    <AppContext.Provider value={{ company, appId }}>
      {children}
    </AppContext.Provider>
  );
};
