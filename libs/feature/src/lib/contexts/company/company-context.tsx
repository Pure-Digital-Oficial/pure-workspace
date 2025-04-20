import { createContext, ReactNode, useContext } from 'react';
import { CompanyResponseDto, CompanyType } from '@pure-workspace/domain';

const CompanyContext = createContext<CompanyType>({
  company: null,
});

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({
  children,
  companyResponse,
}: {
  children: ReactNode;
  companyResponse: CompanyResponseDto;
}) => {
  return (
    <CompanyContext.Provider value={{ company: companyResponse }}>
      {children}
    </CompanyContext.Provider>
  );
};
