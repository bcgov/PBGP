import { PageTitle, Button } from '@components';
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
    'table-td table-header px-6 py-4 text-left text-sm font-strong text-bcBluePrimary border-b-4';
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

const TableBody: React.FC = () => {
  const [openRow, setOpenRow] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number>();
  const tdStyles =
    'table-td px-6 py-4 text-center text-sm font-medium text-gray-900 table-firstRow-TD';
  const tdActivityBundle = 'table-firstRow-firstTD';
//   const { initialValues } = usePlanningActivitiesGap();

  const handleSelectRow = (index: number) => {
    setOpenRow(!openRow);
    setSelectedRow(index);
  };

  return (
    <tbody>
      {/* {initialValues &&
        initialValues.map((row: any, index: number) => (
          <>
            <tr key={`row${index}`} className='bg-white border-b table-row-fixed'>
              <td className={`${tdActivityBundle} flex w-full items-center justify-between`}>
                <div className='w-full flex inline-flex items-left justify-left'>
                  <h2 className='text-l text-left'>
                    {row.name}
                    <p className='text-left text-xs mt-1'>
                      {row.careActivities.length} care & restricted activities
                    </p>
                    <p className='text-left text-xs flex mt-1 justify-left items-center'>
                      <FontAwesomeIcon icon={faTimesCircle} className='h-4 mr-1 numberOfGaps' />
                      {row.numberOfGaps}
                    </p>
                  </h2>
                </div>
                <Button
                  classes='flex inline-flex items-center justify-end h-5 w-5 !p-0 overflow-hidden rounded-full bg-white ml-4'
                  variant='default'
                  type='button'
                  onClick={() => handleSelectRow(index)}
                >
                  <FontAwesomeIcon
                    icon={selectedRow == index && openRow ? faCaretUp : faCaretDown}
                    className='h-4 text-bcBluePrimary'
                  />
                </Button>
              </td>
            </tr>
          </>
        ))} */}
    </tbody>
  );
};

const ApplicationTable: React.FC = () => {
  const width = screen.width - 290;
  return (
    <div className='customTable' style={{ width: width }}>
      <table className='min-w-full text-center'>
        <TableHeader />
        <TableBody />
      </table>
    </div>
  );
};

export const ActivitiesGap: React.FC<ActivitiesGapProps> = ({ title }) => {
  const description =
    'Based on the roles and tasks that you filled in the previous steps, here are the the gaps that we found. Expanding the row on the left hand side table to view more.';
  return (
    <div className='planning-form-box'>
      <PageTitle title={title} description={description}>
        <FontAwesomeIcon icon={faChartBar} className='h-6 text-bcBluePrimary' />
      </PageTitle>
      
      <ApplicationTable />
    </div>
  );
};
