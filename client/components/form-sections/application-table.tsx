import { Button, SearchBar } from '@components';
import { Pagination } from '../form';
import { useEffect, useState } from 'react';
import { ApplicationTableData } from '../../constants';
import { ApplicationDataInterface } from '../../constants/interfaces';
import axios from 'axios';

type Props = { applications: ApplicationDataInterface[] };

const TableHeader: React.FC = () => {
  const headers = [
    'Confirmation ID',
    'Facility',
    'Project',
    'Estimated Cost',
    'Asks',
    'Assigned to',
    'Last update',
    'Status',
  ];
  const tdStyles =
    'table-td table-header px-6 py-4 text-left text-sm font-strong border-b-2  border-bcYellowWarning';
  return (
    <thead className='border-b bg-bcGrayInput table-header'>
      <tr>
        {headers &&
          headers.map((title: string, index: number) => (
            <th key={`th${index}`} className={tdStyles}>
              {title}
            </th>
          ))}
      </tr>
    </thead>
  );
};

const TableBody: React.FC<Props> = applications => {
  const handleSelectRow = (index: number) => {
    alert(index);
  };
  const tdStyles =
    'table-td px-6 py-4 text-left text-sm font-strong flexitems-center justify-between';
  return (
    <tbody>
      {applications.applications &&
        applications.applications.map((row: any, index: number) => (
          <tr
            key={`row${index}`}
            onClick={() => handleSelectRow(row.BCAAP_Form_ID)}
            className='bg-white border-b-2 even:bg-bcGrayInput
              border-gray-200'
          >
            <td className={tdStyles}>{row.Confirmation_ID}</td>
            <td className={tdStyles}>{row.Facility_Name}</td>
            <td className={tdStyles}>{row.Assigned_To}</td>
            <td className={tdStyles}>{row.Created_At}</td>
            <td className={tdStyles}>{row.Status}</td>
            <td className={tdStyles}>{row.Assigned_To}</td>
            <td className={tdStyles}>{row.Updated_At}</td>
            <td className={tdStyles}>{row.Status}</td>
          </tr>
        ))}
    </tbody>
  );
};

const ApplicationTable: React.FC<Props> = applications => {
  return (
    <div>
      <table className='min-w-full text-center'>
        <TableHeader />
        {ApplicationTableData && applications.applications.length != 0 ? (
          <TableBody applications={applications.applications} />
        ) : (
          <p className='text-center text-sm mt-4'>No applications found.</p>
        )}
      </table>
    </div>
  );
};

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
