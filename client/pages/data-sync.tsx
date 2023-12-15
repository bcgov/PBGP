import dynamic from 'next/dynamic';
import { Layout, DataSyncForm, withAuth } from '../components';

export const DataSync: React.FC<any> = () => {
  return (
    <Layout pageName='Data Sync'>
      <div>
        <div className='w-full bg-white flex my-4 justify-between'>
          <h1 className='text-2xl font-bold h-6 text-left flex-col items-start'>CHEFS Data Sync</h1>
        </div>
        <DataSyncForm />
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(withAuth(DataSync)), {
  ssr: false,
});
