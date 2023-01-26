import { withAuth } from '@components';
import { ScoreSummaryTable } from 'components/ScoreSummaryTable';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ScoreTable: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  return <ScoreSummaryTable applicationId={id as string} />;
};

export default dynamic(() => Promise.resolve(withAuth(ScoreTable)), {
  ssr: false,
});
