import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Layout, withAuth } from '../../components';
import { ApplicationDashboard } from '../../components/bcaap-form-sections';

const Applications: NextPage = () => {
  return (
    <Layout pageName='Applications'>
      <ApplicationDashboard />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Applications)), {
  ssr: false,
});
