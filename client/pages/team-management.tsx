import dynamic from 'next/dynamic';
import { Layout, TeamManagementTable, withAuth } from '../components';
import { useTeamManagement } from '../services';

export const TeamManagement: React.FC<any> = () => {
  const { userData, updateAdminAccessModal, updatePortalAccessModal } = useTeamManagement();

  return (
    <Layout pageName='Team Management'>
      <div>
        <div className='w-full bg-white flex my-4 justify-between'>
          <h1 className='text-2xl font-bold h-6 text-left flex-col items-start'>Team Management</h1>
        </div>
        <TeamManagementTable
          data={userData}
          updateAdminAccess={updateAdminAccessModal}
          updatePortalAccess={updatePortalAccessModal}
        />
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(withAuth(TeamManagement)), {
  ssr: false,
});
