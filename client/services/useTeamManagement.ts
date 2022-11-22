import { useEffect, useState } from 'react';
import { UserInterface } from '../contexts';
import data from './userData.json';

export const useTeamManagement = () => {
  const [userData, setUserData] = useState<UserInterface[]>([]);

  const updateAdminAccess = (id: string, grantAccess: boolean) => {
    //TODO: API call to backend and refresh the data
    // eslint-disable-next-line no-console
    console.log('Admin API call', id, grantAccess);
  };

  const updatePortalAccess = (id: string, grantAccess: boolean) => {
    //TODO: API call to backend and refresh the data
    // eslint-disable-next-line no-console
    console.log('Portal API call', id, grantAccess);
  };

  useEffect(() => {
    setUserData(data);
  }, []);

  return {
    userData,
    updateAdminAccess,
    updatePortalAccess,
  };
};
