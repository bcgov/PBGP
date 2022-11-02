import { createContext } from 'react';

export interface ApplicationFormDataContextType {
  applicationId: string;
  setApplicationId: (id: string) => void;
}

export const ApplicationFormDataContext = createContext<ApplicationFormDataContextType | null>(
  null
);
