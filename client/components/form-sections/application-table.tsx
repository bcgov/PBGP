import { Button, ApplicationTable } from '@components';
import { Pagination } from '../form';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useHttp } from '../../services/useHttp';
// import { useSearchParams } from 'react-router-dom';

export const ApplicationDashboard: React.FC<any> = () => {
  const [state, setState] = useState({
    searchFacilityName: '',
    searchConfirmatioID: '',
    applicationsPerPage: 1,
    totalApplications: 0,
    currentPage: 1,
    data: [],
  });

  const {
    searchFacilityName,
    searchConfirmatioID,
    applicationsPerPage,
    totalApplications,
    currentPage,
    data,
  } = state;

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
      setApplicationData(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setApplicationData(false);
    })();
  }, [currentPage]);

  // Change pages
  const nextPage = () => {
    if (!totalApplications || currentPage == Math.ceil(totalApplications / applicationsPerPage))
      return;
    setState(state => ({ ...state, currentPage: currentPage + 1 }));
    const params = {
      params: { page: currentPage + 1 },
    };
    setApplicationData(params);
  };
  const previousPage = () => {
    if (currentPage == 1) return;

    setState(state => ({ ...state, currentPage: currentPage - 1 }));
    const params = {
      params: { page: currentPage - 1 },
    };
    setApplicationData(params);
  };
  const firstPage = () => {
    if (currentPage == 1) return;

    setState(state => ({ ...state, currentPage: 1 }));
    const params = {
      params: { page: 1 },
    };
    setApplicationData(params);
  };
  const lastPage = () => {
    if (!totalApplications || currentPage == Math.ceil(totalApplications / applicationsPerPage))
      return;

    setState(state => ({
      ...state,
      currentPage: Math.ceil(totalApplications / applicationsPerPage),
    }));

    const params = {
      params: {
        page: Math.ceil(totalApplications / applicationsPerPage),
        limit: applicationsPerPage,
      },
    };
    setApplicationData(params);
  };

  const checkInputs = searchFacilityName.length == 0 && searchConfirmatioID.length == 0;

  const handleFilter = () => {
    if (checkInputs) return;
    const params = {
      params: { facilityName: searchFacilityName, confirmationId: searchConfirmatioID },
    };
    setApplicationData(params);
  };

  const handleClear = () => {
    if (checkInputs) return;
    // Clear Inputs
    setState(state => ({ ...state, searchFacilityName: '', searchConfirmatioID: '' }));

    const params = { params: { facilityName: '', confirmationId: '' } };
    setApplicationData(params);
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
        currentPage={currentPage}
        applicationsPerPage={applicationsPerPage}
        totalApplications={totalApplications}
        firstPage={firstPage}
        lastPage={lastPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};
