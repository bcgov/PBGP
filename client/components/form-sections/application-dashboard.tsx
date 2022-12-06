import { Button, ApplicationTable } from '@components';
import { Pagination } from '../form';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useHttp } from '../../services/useHttp';
import { SetQueryParams } from '../../services/useQueryParams';
import { useRouter } from 'next/router';
import { Endpoints } from '../../constants';

export const ApplicationDashboard: React.FC<any> = () => {
  const [state, setState] = useState({
    searchFacilityName: '',
    searchConfirmationID: '',
    totalApplications: 0,
    data: [],
  });

  const { searchFacilityName, searchConfirmationID, totalApplications, data } = state;
  const { push, query } = useRouter();
  const { fetchData } = useHttp();
  const { page, limit } = query;

  const setApplicationData = async (params: any) => {
    fetchData(
      {
        endpoint: Endpoints.APPLICATIONS,
        params,
      },
      ({ result, total }: any) => {
        setState(state => ({ ...state, data: result, totalApplications: total }));
      },
    );
  };

  useEffect(() => {
    (async () => {
      const params = { ...query, page: 1, limit: 20, facilityName: '', confirmationId: '' };
      SetQueryParams(push, query, params);
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
    if (!totalApplications || Number(page) == Math.ceil(totalApplications / Number(limit))) return;
    const params = { ...query, page: Number(page) + 1, limit: Number(limit) };
    SetQueryParams(push, query, params);
  };
  const previousPage = () => {
    if (Number(page) == 1) return;
    const params = { ...query, page: Number(page) - 1, limit: Number(limit) };
    SetQueryParams(push, query, params);
  };
  const firstPage = () => {
    if (Number(page) == 1) return;
    const params = { ...query, page: 1, limit: Number(limit) };
    SetQueryParams(push, query, params);
  };
  const lastPage = () => {
    if (!totalApplications || Number(page) == Math.ceil(totalApplications / Number(limit))) return;
    const params = {
      ...query,
      page: Math.ceil(totalApplications / Number(page)),
      limit: Number(limit),
    };
    SetQueryParams(push, query, params);
  };

  const handleFilter = () => {
    const checkInputs = searchFacilityName.length == 0 && searchConfirmationID.length == 0;
    if (checkInputs) return;
    const params = {
      ...query,
      facilityName: searchFacilityName,
      confirmationId: searchConfirmationID,
    };
    SetQueryParams(push, query, params);
  };

  const handleClear = () => {
    const checkInputs = searchFacilityName.length == 0 && searchConfirmationID.length == 0;
    if (checkInputs) return;
    // Clear Inputs
    setState(state => ({ ...state, searchFacilityName: '', searchConfirmationID: '' }));
    const params = { ...query, facilityName: '', confirmationId: '', limit: Number(limit) };
    SetQueryParams(push, query, params);
  };

  return (
    <div>
      <div className='w-full bg-white flex my-2 justify-between'>
        <h1 className='text-2xl font-bold h-6 text-bcBluePrimary text-left flex-col items-start'>
          Applications
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
            onChange={e => setState(p => ({ ...p, searchConfirmationID: e.target.value }))}
            value={searchConfirmationID}
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
        currentPage={Number(page)}
        applicationsPerPage={Number(limit)}
        totalApplications={totalApplications}
        firstPage={firstPage}
        lastPage={lastPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};
