import { Button, SearchBar, ApplicationTable } from '@components';
import { Pagination } from '../form';
import { useEffect, useState } from 'react';
import { ApplicationTableData } from '../../constants';
import { ApplicationDataInterface } from '../../constants/interfaces';
import axios from 'axios';

type Props = { applications: ApplicationDataInterface[] };

const FilterBy: React.FC<Props> = applications => {
  return (
    <div className='w-full border py-4 px-8 mb-2'>
      Filter By:
    </div>
  );
};

export const ApplicationDashboard: React.FC<any> = () => {
  const [data, setData] = useState<[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [applicationsPerPage] = useState<number>(10);
  const [searchValue, setSearchValue]: [string, (search: string) => void] = useState('');

  useEffect(()=> {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080?q=${searchValue}`)
      setData(res.data);
    }
    // fetchData()
  }, [searchValue])

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
  };

  // Filter data with search value
  const keys = ['Application_ID', 'Facility_Name', 'Assigned_To'];
  const filteredApplications =
    ApplicationTableData &&
    ApplicationTableData.filter((item: any) =>
      keys.some(key => item[key].toLowerCase().includes(searchValue.toLowerCase())),
    );

  // Get current Applications
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirstApplication,
    indexOfLastApplication,
  );

  // Change pages
  const nextPage = () => {
    if (currentPage == Math.floor(filteredApplications.length / applicationsPerPage) + 1) return;
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
    if (currentPage == filteredApplications.length / applicationsPerPage) return;
    setCurrentPage(Math.floor(filteredApplications.length / applicationsPerPage) + 1);
  };

  return (
    <div>
      <div className='w-full bg-white flex my-2 justify-between'>
        <h1 className='text-2xl font-bold h-6 text-bcBluePrimary text-left flex-col items-start'>
          Applications
        </h1>
        <div className='grid grid-cols-2 gap-1'>
          <SearchBar handleChange={handleSearch} />
          <div className='grid grid-cols-2 gap-1'>
            <Button variant='outline'>Filter</Button>
            <Button variant='primary'>Export PDF</Button>
          </div>
        </div>
      </div>
      <FilterBy />
      <ApplicationTable applications={currentApplications} />
      <Pagination
        currentPage={currentPage}
        applicationsPerPage={applicationsPerPage}
        totalApplications={filteredApplications.length}
        firstPage={firstPage}
        lastPage={lastPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};
