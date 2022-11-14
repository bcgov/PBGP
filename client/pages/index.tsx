
import { withAuth } from '@components';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ApplicationDashboard } from '@components';

const Dashboard: NextPage = () => {
  
  return (
    <div className='flex flex-col w-full px-10 py-5 bg-white'>
      <ApplicationDashboard />
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Dashboard)), {
  ssr: false,
});
