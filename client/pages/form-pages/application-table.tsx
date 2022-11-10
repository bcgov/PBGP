import { Button, SearchBar } from '@components';
import { Pagination } from '../../components/form/Pagination';
import { useState } from 'react';
import initialValues from './example_submission_data.json';

export interface ActivitiesGapProps {
  step: number;
  title: string;
}

const TableHeader: React.FC = () => {
  //   const { initialValues } = usePlanningActivitiesGap();
  const headers = [
    'Confirmation ID',
    'Identifier number',
    'Last Reviewed by',
    'Last update',
    'Status',
  ];
  const tdStyles =
    'table-td table-header px-6 py-4 text-left text-sm font-strong text-bcBluePrimary border-b-2  border-amber-200';
  return (
    <thead className='border-b bg-gray-50 table-row-fixed table-header '>
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

const TableBody: React.FC = (applications: any) => {
  const handleSelectRow = (index: number) => {
    alert(index);
  };

  return (
    <tbody>
      {applications.applications &&
        applications.applications.map((row: any, index: number) => (
          <>
            <tr
              key={`row${index}`}
              onClick={() => handleSelectRow(row.BCAAP_Form_ID)}
              className='bg-white border-b table-row-fixed'
            >
              <td className={`flexitems-center justify-between`}>{row.Confirmation_ID}</td>
              <td className={`flexitems-center justify-between`}>{row.BCAAP_Form_ID}</td>
              <td className={`flexitems-center justify-between`}>{row.Assigned_To}</td>
              <td className={`flexitems-center justify-between`}>{row.Created_At}</td>
              <td className={`flexitems-center justify-between`}>{row.Status}</td>
            </tr>
          </>
        ))}
    </tbody>
  );
};

const ApplicationTable: React.FC = (applications: any) => {
  return (
    <div className='customTable'>
      <table className='min-w-full text-center'>
        <TableHeader />
        {initialValues && applications.applications.length != 0 ? (
          <TableBody applications={applications.applications} />
        ) : (
          <p className='text-center text-sm mt-4'>No applications found.</p>
        )}
      </table>
    </div>
  );
};

export const ApplicationPage: React.FC<ActivitiesGapProps> = ({ title }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [applicationsPerPage] = useState<number>(15);
  const [searchValue, setSearchValue]: [string, (search: string) => void] = useState('');

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
  };

  // Filter data with search value
  const filteredApplications =
    initialValues &&
    initialValues.filter((item: any) => {
      return item.Confirmation_ID.toLowerCase().includes(searchValue.toLowerCase());
    });

  // Get current Applications
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
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
    <div className='planning-form-box'>
      <div className='flex-1 flex flex-col min-h-0'>
        <div className='flex justify-center'>
          <div className='w-full bg-white flex my-2 justify-between'>
            <h1 className='text-xl text-bcBluePrimary text-left w-full flex-col items-start'>
              Applications
            </h1>
            <div className='grid grid-cols-2 gap-2'>
              <SearchBar handleChange={handleSearch} />
              <Button variant='primary'>Export PDF</Button>
            </div>
          </div>
        </div>
      </div>
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
