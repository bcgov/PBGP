import { PageTitle, Button, SearchBar } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faCaretDown,
  faTimesCircle,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
// import { tooltipIcons, TooltipIconTypes } from '../../common';
// import { TooltipIcon } from '../generic/TooltipIcon';
import  initialValues  from './example_submission_data.json';

export interface ActivitiesGapProps {
  step: number;
  title: string;
}

const TableHeader: React.FC = () => {
//   const { initialValues } = usePlanningActivitiesGap();
const headers = ['Confirmation ID','Identifier number', 'Last Reviewed by',  'Last update', 'Status'];
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

// const SwitchTooltip: React.FC<any> = props => {
//   const { item } = props;
//   switch (item) {
//     case 'MIXED':
//       return <TooltipIcon {...tooltipIcons[TooltipIconTypes.YELLOW_QUESTION]} />;
//     case 'X':
//       return <TooltipIcon {...tooltipIcons[TooltipIconTypes.GREEN_CHECKMARK]} />;
//     case 'L':
//       return <TooltipIcon {...tooltipIcons[TooltipIconTypes.YELLOW_CAUTION]} />;
//     case 'C(E)':
//       return <TooltipIcon {...tooltipIcons[TooltipIconTypes.YELLOW_EXCLAMATION]} />;
//     case 'A':
//       return <TooltipIcon {...tooltipIcons[TooltipIconTypes.YELLOW_X]} />;
//     case '':
//       return <TooltipIcon {...tooltipIcons[TooltipIconTypes.RED_X]} />;
//     default:
//       return item;
//   }
// };

const TableBody: React.FC = (applications:any) => {
  const [openRow, setOpenRow] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number>();
  const tdStyles =
    'table-td px-6 py-4 text-center text-sm font-medium text-gray-900 table-firstRow-TD';
  const tdActivityBundle = 'table-firstRow-firstTD';
//   const { initialValues } = usePlanningActivitiesGap();

  const handleSelectRow = (index: number) => {
    alert(index)
  };
  return (
    <tbody>
      {applications.applications &&
        applications.applications.map((row: any, index: number) => (
          <>
            <tr key={`row${index}`} onClick={()=>handleSelectRow(row.BCAAP_Form_ID)} className='bg-white border-b table-row-fixed'>
              <td className={`${tdActivityBundle} flexitems-center justify-between`}>
                  {row.Confirmation_ID}
              </td>
              <td className={`${tdActivityBundle} flexitems-center justify-between`}>
                  {row.BCAAP_Form_ID}
              </td>
              <td className={`${tdActivityBundle} flexitems-center justify-between`}>
                  {row.Assigned_To}
              </td>
              <td className={`${tdActivityBundle} flexitems-center justify-between`}>
                  {row.Created_At}
              </td>
              <td className={`${tdActivityBundle} flexitems-center justify-between`}>
                  {row.Status}
              </td>
            </tr>
          </>
        ))}
    </tbody>
  );
};

const ApplicationTable: React.FC = () => {
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


  return (
    <div className='customTable'>
      <div className='flex-1 flex flex-col min-h-0'>
        <div className='flex justify-center'>
          <div className='w-full bg-white flex my-2 justify-between'>
            {/* <h1>Applications</h1> */}
            <h1 className='text-xl text-bcBluePrimary text-left w-full flex-col items-start'>Applications</h1>
            <div className='grid grid-cols-2 gap-2'>
              <SearchBar handleChange={handleSearch} />
              <Button variant='primary'>Export PDF</Button>
            </div>
          </div>
        </div>
      </div>
      <table className='min-w-full text-center'>
        <TableHeader />
        {initialValues && filteredApplications.length != 0 ? (
          <TableBody applications={filteredApplications}/>
        ) : (
          <p className='text-center text-sm mt-4'>No applications found.</p>
        )}
      </table>
    </div>
  );
};

export const ApplicationPage: React.FC<ActivitiesGapProps> = ({ title }) => {
  return (
    <div className='planning-form-box'>
      <ApplicationTable />
    </div>
  );
};
