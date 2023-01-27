import { Link, withAuth } from '@components';
import { ScoreSummaryTable } from 'components/ScoreSummaryTable';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useApplicationDetails } from 'services';

const ScoreTable: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  const { details } = useApplicationDetails(id);
  return (
    <div>
      {details && id && typeof id === 'string' && (
        <div className='min-h-screen p-5 w-full bg-white'>
          <div className='w-full mt-2'>
            <Link href='/applications' variant='link'>
              Applications
            </Link>{' '}
            <Link href={`/applications/${id}`} variant='link'>
              &gt;&gt; Confirmation ID: {details.confirmationId}
            </Link>
          </div>
          <h1 className='text-3xl w-full text-bcBluePrimary text-left mb-2 mt-2'>Summary Table</h1>
          <ScoreSummaryTable applicationId={id as string} />
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(ScoreTable)), {
  ssr: false,
});
