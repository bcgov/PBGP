import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useHttp } from '../../services/useHttp';
import { Endpoints } from '../../constants';
import Link from 'next/link';
import { Button, Panels } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';

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

  // console.log("++++++++++++++++++++ details", details)
  useEffect(() => {
    (async () => {
      if (!id) return;
      setApplicationDetails();
    })();
  }, []);

  const topStatusObj = [
    { title: 'Status', value: 'status' },
    { title: 'Facility', value: 'facilityName' },
    { title: 'Estimated cost', value: 'totalEstimatedCost' },
    { title: 'Asks', value: 'asks' },
    { title: 'Last updated', value: 'updatedAt' },
    { title: 'Updated by', value: 'status' },
  ];

  return (
    <div className='min-h-screen p-10 w-full bg-white'>
      <div className='w-full'>
        <Link href='/applications'>Applications</Link> | Confirmation ID: {details.confirmationId}
      </div>
      <h1 className='text-5xl w-full text-left mb-2'>{details.projectTitle || 'Project Title'}</h1>
      <div className='flex mb-2'>
        <div className='w-1/3 grid grid-cols-2 gap-2'>
          <Button variant='outline'>
            <FontAwesomeIcon icon={faUser} className='h-4 mr-2 text-bcBluePrimary' /> Assign
            Evaluator
          </Button>
          <Button variant='outline'>
            <FontAwesomeIcon icon={faComment} className='h-4 mr-2 text-bcBluePrimary' /> Comments
          </Button>
        </div>
        <div className='w-1/3'></div>
        <div className='w-1/3 flex justify-end grid  gap-2'>
          <Button variant='primary'>Open</Button>
        </div>
      </div>

      <div className='grid grid-cols-6 gap-2'>
        {topStatusObj.map((item, index) => {
          return (
            <div
              key={`statusBox-${index}`}
              className={`p-2 py-5 h-24 ${
                index == 0 ? ' bg-bcBluePrimary text-white' : ' bg-gray-100'
              }  items-center text-center justify-center`}
            >
              <p className='text-sm text-slate-400'>{item.title}</p>
              <p className='text-lg'>{details[item.value]}</p>
            </div>
          );
        })}
      </div>

      <Panels title='Contact Information'>
        <p>Add Component</p>
      </Panels>
      <Panels title='General Project Information and Description'>
        <p>Add Component</p>
      </Panels>
      <Panels title='Funding Eligibility'>
        <p>Add Component</p>
      </Panels>
      <Panels title='Funding and Project Cost Estimate Information'>
        <p>Add Component</p>
      </Panels>
      <Panels title='Support Documentation and Checklist'>
        <p>Add Component</p>
      </Panels>
      <Panels title='Authorization'>
        <p>Add Component</p>
      </Panels>

      {/* <div className='w-full'>{JSON.stringify(details, null, 4)}</div> */}
    </div>
  );
}
