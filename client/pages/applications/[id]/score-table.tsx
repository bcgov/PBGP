import { withAuth } from '@components';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const ScoreTable: NextPage = () => {
  return <h1>TEST</h1>;
};

export default dynamic(() => Promise.resolve(withAuth(ScoreTable)), {
  ssr: false,
});
