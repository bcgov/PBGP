import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../constants';
import { UserInterface } from '../contexts';
import { useHttp } from './useHttp';

export const useTeamManagement = () => {
  const [userData, setUserData] = useState<UserInterface[]>([]);
  const { fetchData } = useHttp();

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

  const fetchUsers = () => {
    fetchData(
      {
        endpoint: API_ENDPOINT.FETCH_USERS,
      },
      (data: UserInterface[]) => {
        setUserData(data);
      },
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    userData,
    updateAdminAccess,
    updatePortalAccess,
  };
};
