import { Button, ApplicationTable } from '@components';
import { Pagination } from '../form';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useHttp } from '../../services/useHttp';
import { useRouter } from 'next/router';

export const ApplicationDashboard: React.FC<any> = () => {
  const [state, setState] = useState({
    searchFacilityName: '',
    searchConfirmatioID: '',
    totalApplications: 0,
    data: [],
  });

  const { searchFacilityName, searchConfirmatioID, totalApplications, data } = state;

  const { push, query } = useRouter();
  const { fetchData } = useHttp();

  const setApplicationData = async (params: any) => {
    try {
      const data = await fetchData(params);
      setState(state => ({ ...state, data: data.result, totalApplications: data.total }));
    } catch (err) {
      // console.log('Error occured when fetching applications');
    }
  };

  useEffect(() => {
    (async () => {
      push(
        { query: { ...query, page: 1, limit: 1, facilityName: '', confirmationId: '' } },
        undefined,
        { shallow: true },
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Object.keys(query).length === 0) return;
      setApplicationData(query);
    })();
  }, [query]);

  // Change pages
  const nextPage = () => {
    if (
      !totalApplications ||
      Number(query.page) == Math.ceil(totalApplications / Number(query.limit))
    )
      return;
    push(
      { query: { ...query, page: Number(query.page) + 1, limit: Number(query.limit) } },
      undefined,
      { shallow: true },
    );
  };
  const previousPage = () => {
    if (Number(query.page) == 1) return;
    push(
      { query: { ...query, page: Number(query.page) - 1, limit: Number(query.limit) } },
      undefined,
      { shallow: true },
    );
  };
  const firstPage = () => {
    if (Number(query.page) == 1) return;
    push({ query: { ...query, page: 1, limit: Number(query.limit) } }, undefined, {
      shallow: true,
    });
  };
  const lastPage = () => {
    if (
      !totalApplications ||
      Number(query.page) == Math.ceil(totalApplications / Number(query.limit))
    )
      return;
    push(
      {
        query: {
          ...query,
          page: Math.ceil(totalApplications / Number(query.page)),
          limit: Number(query.limit),
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const checkInputs = searchFacilityName.length == 0 && searchConfirmatioID.length == 0;
  const handleFilter = () => {
    if (checkInputs) return;
    push(
      {
        query: { ...query, facilityName: searchFacilityName, confirmationId: searchConfirmatioID },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleClear = () => {
    if (checkInputs) return;
    // Clear Inputs
    setState(state => ({ ...state, searchFacilityName: '', searchConfirmatioID: '' }));

    push(
      { query: { ...query, facilityName: '', confirmationId: '', limit: Number(query.limit) } },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div>
      <div className='w-full bg-white flex my-2 justify-between'>
        <h1 className='text-2xl font-bold h-6 text-bcBluePrimary text-left flex-col items-start'>
          Applications {query.limit}
        </h1>
      </div>
      <div className='w-full border py-4 px-8 mb-2'>
        Filter By:
        <div className='grid grid-cols-3 gap-1'>
          <input
            type='text'
            className='bg-white rounded border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder={'Facility Name'}
            onChange={e => setState(p => ({ ...p, searchFacilityName: e.target.value }))}
            value={searchFacilityName}
          />
          <input
            type='text'
            className='bg-white rounded border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder={'Confirmation ID'}
            onChange={e => setState(p => ({ ...p, searchConfirmatioID: e.target.value }))}
            value={searchConfirmatioID}
          />

          <div className='grid grid-cols-2 gap-1'>
            <Button onClick={handleFilter} variant='primary'>
              <FontAwesomeIcon icon={faFilter} className='h-4 mr-2' />
              Filter Records
            </Button>
            <Button onClick={handleClear} variant='outline'>
              <FontAwesomeIcon icon={faTimes} className='h-4 mr-2' />
              Clear Filter
            </Button>
          </div>
        </div>
      </div>

      {data && <ApplicationTable applications={data} />}

      <Pagination
        currentPage={Number(query.page)}
        applicationsPerPage={Number(query.limit)}
        totalApplications={totalApplications}
        firstPage={firstPage}
        lastPage={lastPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};
