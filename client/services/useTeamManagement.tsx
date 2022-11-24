import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../constants';
import { UserInterface } from '../contexts';
import { useHttp } from './useHttp';
import { useModal } from './useModal';

export const useTeamManagement = () => {
  const [userData, setUserData] = useState<UserInterface[]>([]);
  const { fetchData } = useHttp();
  const { openModal } = useModal();

  const updateAdminAccess = (id: string, grantAccess: boolean) => {
    //TODO: API call to backend and refresh the data
    // eslint-disable-next-line no-console
    console.log('Admin API call', id, grantAccess);
  };

  const updateAdminAccessModal = (id: string, grantAccess: boolean) => {
    let title = 'Grant Admin Access';
    let children =
      'Do you wish to grant admin access to user? Kindly note that providing admin access would provide access to the portal.';

    if (!grantAccess) {
      title = 'Revoke Admin Access';
      children = 'Do you wish to revoke admin access to user?';
    }
    openModal({
      title: title,
      children: <p className='text-sm text-gray-500'>{children}</p>,
      positiveActionText: 'Yes, continue',
      positiveActionOnClick: () => updateAdminAccess(id, grantAccess),
    });
  };

  const updatePortalAccess = (id: string, grantAccess: boolean) => {
    //TODO: API call to backend and refresh the data
    // eslint-disable-next-line no-console
    console.log('Portal API call', id, grantAccess);
  };

  const updatePortalAccessModal = (id: string, grantAccess: boolean) => {
    let title = 'Grant Portal Access';
    let children = 'Do you wish to grant portal access to user?';

    if (!grantAccess) {
      title = 'Revoke Portal Access';
      children = 'Do you wish to revoke portal access to user?';
    }
    openModal({
      title: title,
      children: <p className='text-sm text-gray-500'>{children}</p>,
      positiveActionText: 'Yes, continue',
      positiveActionOnClick: () => updatePortalAccess(id, grantAccess),
    });
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
    updateAdminAccessModal,
    updatePortalAccessModal,
  };
};
