import { Button, ApplicationTable } from '@components';
import { Pagination } from '../form';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ApplicationDashboard: React.FC<any> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [applicationsPerPage] = useState<number>(2);
  const [totalApplications, setTotalApplications] = useState<number>();
  const [searchFacilityName, setSearchFacilityName] = useState<string>('');
  const [searchConfirmatioID, setSearchConfirmatioID] = useState<string>('');
  const [data, setData] = useState<any>([]);

  const fetchData = async (clearData: boolean) => {
    let url;
    if (clearData) {
      url = `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/applications?facilityName=${''}&confirmationId=${''}&orderBy=status&page=${currentPage}&limit=${applicationsPerPage}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_SERVER_URL}/applications?facilityName=${searchFacilityName}&confirmationId=${searchConfirmatioID}&orderBy=status&page=${currentPage}&limit=${applicationsPerPage}`;
    }
    const res = await axios.get(url);
    return res;
  };

  const setApplicationData = async (clearData: boolean) => {
    try {
      const data = await fetchData(clearData);
      setData(data.data.result);
      setTotalApplications(data.data.total);
    } catch (err) {
      // console.log('Error occured when fetching applications');
    }
  };

  useEffect(() => {
    (async () => {
      setApplicationData(false);
    })();
  }, [currentPage]);

  // Change pages
  const nextPage = () => {
    if (!totalApplications || currentPage == Math.ceil(totalApplications / applicationsPerPage))
      return;
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    if (currentPage == 1) return;
    setCurrentPage(currentPage - 1);
  };
  const firstPage = () => {
    if (currentPage == 1) return;
    setCurrentPage(1);
  };
  const lastPage = () => {
    if (!totalApplications || currentPage == Math.ceil(totalApplications / applicationsPerPage))
      return;
    setCurrentPage(Math.ceil(totalApplications / applicationsPerPage));
  };

  const handleFilter = () => {
    (async () => {
      setApplicationData(false);
    })();
  };

  const handleClear = () => {
    setSearchFacilityName('');
    setSearchConfirmatioID('');
    (async () => {
      setApplicationData(true);
    })();
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
            placeholder={'Search'}
            onChange={e => setSearchFacilityName(e.target.value)}
            value={searchFacilityName}
          />
          <input
            type='text'
            className='bg-white rounded border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder={'Search'}
            onChange={e => setSearchConfirmatioID(e.target.value)}
            value={searchConfirmatioID}
          />

          <div className='grid grid-cols-2 gap-1'>
            {searchFacilityName ||
              (searchConfirmatioID && (
                <Button onClick={handleClear} variant='outline'>
                  Clear
                </Button>
              ))}

            <Button onClick={handleFilter} variant='primary'>
              Filter
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
