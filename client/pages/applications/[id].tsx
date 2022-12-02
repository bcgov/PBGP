import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useHttp } from '../../services/useHttp';
import { Endpoints } from '../../constants';
import Link from 'next/link';
import { Button } from '@components';

export default function ApplicationDetails() {
    const [details, setDetails] = useState<any>({});
    const { fetchData } = useHttp();
    const { query } = useRouter();
    const { id } = query;

    const setApplicationDetails = async () => {
        const params = { ...query, page: 1, limit: 1, confirmationId: id };
        fetchData(
          {
            endpoint: Endpoints.APPLICATIONS,
            params,
          },
          ({ result }: any) => {
            setDetails(result[0]);
          },
        );
      };

    //   console.log("++++++++++++++++++++ details", details)
      useEffect(() => {
        (async () => {
          if (!id) return;
          setApplicationDetails();
        })();
      }, []);

    return <div className='min-h-screen p-10 w-full bg-white'>
        <div className='w-full'><Link href='/applications'>Applications</Link> > Confirmation ID: {details.confirmationId}</div>
        <h1 className="text-5xl w-full text-left mb-2">{details.projectTitle || 'Project Title'}</h1>
        <div className="flex mb-2">
            <div className="w-1/2">
                <Button variant='outline'>Assign Evaluator</Button>
                <Button variant='outline'>Comments</Button>
            </div>
            <div className="w-1/2 flex justify-end">
                <Button variant='primary'>Open</Button>
            </div>
        </div>
        
        <div className='grid grid-cols-6 gap-2'>
            <div className='p-2 bg-bcBluePrimary text-white py-6 items-center text-center justify-center'>
                <p className='text-sm text-slate-400'>Status</p>
                <p className='text-lg'>{details.status}</p>
            </div>
            <div className='p-2 py-6 items-center text-center justify-center bg-gray-100'>
                <p className='text-sm text-slate-500'>Facility</p>
                <p className='text-lg'>{details.facilityName}</p>
            </div>
            <div className='p-2 py-6 items-center text-center justify-center bg-gray-100'>
                <p className='text-sm text-slate-500'>Estimated cost</p>
                <p className='text-lg'>{details.totalEstimatedCost}</p>
            </div>
            <div className='p-2 py-6 items-center text-center justify-center bg-gray-100'>
                <p className='text-sm text-slate-500'>Asks</p>
                <p className='text-lg'>{details.asks}</p>
            </div>
            <div className='p-2 py-6 items-center text-center justify-center bg-gray-100'>
                <p className='text-sm text-slate-500'>Last updated</p>
                <p className='text-lg'>{details.updatedAt}</p>
            </div>
            <div className='p-2 py-6 items-center text-center justify-center bg-gray-100'>
                <p className='text-sm text-slate-500'>Updated by</p>
                <p className='text-lg'>{details.status}</p>
            </div>
        </div>

        <div className='w-full'>
         {JSON.stringify(details, null, 4)}
        </div>
        
        </div>
}

