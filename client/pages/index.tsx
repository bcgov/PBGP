import { withAuth } from '@components';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/applications/');
  }, [router]);

  return null;
};


export default dynamic(() => Promise.resolve(withAuth(Dashboard)), {
  ssr: false,
});
