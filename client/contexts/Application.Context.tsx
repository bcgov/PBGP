import { createContext } from 'react';

export interface ApplicationContextType {
  applicationId: string;
  setApplicationId: (id: string) => void;
}

export const ApplicationContext = createContext<ApplicationContextType | null>(null);
