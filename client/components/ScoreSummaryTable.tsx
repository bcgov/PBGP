import { ScoreSummaryTableProps } from 'constants/interfaces';
import Link from 'next/link';
import { useEffect } from 'react';
import { useBroaderReview } from 'services';

// type Props = { scores: ScoreSummaryTableProps[] };

const TableHeader: React.FC = () => {
  const headers = ['Question', 'Final Score'];
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

// const TableBody: React.FC<Props> = data => {
//   const tdStyles =
//     'table-td px-6 py-4 text-left text-sm font-strong flexitems-center justify-between';
//   return (
//     <tbody>
//       {data.scores &&
//         data.scores.map((row: any, index: number) => (
//           <Link href={`scores/${row.id}`} key={`row${index}`}>
//             <tr
//               className='bg-white border-b-2 even:bg-bcGrayInput
//               border-gray-200 cursor-pointer'
//             >
//               {/* <td className={tdStyles}>{row.confirmationId}</td>
//               <td className={tdStyles}>{row.facilityName}</td>
//               <td className={tdStyles}>{row.projectTitle}</td>
//               <td className={tdStyles}>{row.totalEstimatedCost}</td>
//               <td className={tdStyles}>{row.asks}</td>
//               <td className={tdStyles}>{row.assignedTo ? row.assignedTo.displayName : ''}</td>
//               <td className={tdStyles}>{row.updatedAt}</td>
//               <td className={tdStyles}>{row.status}</td> */}
//             </tr>
//           </Link>
//         ))}
//     </tbody>
//   );
// };

export const ScoreSummaryTable: React.FC<ScoreSummaryTableProps> = ({ applicationId }) => {
  const {
    applicationScores,
    applicationScoresByScorer,
    // handleSubmit,
    // selectedUser,
    // isLoggedInUser,
    // handleChangeScorer,
    // loggedInUser,
    // isLoading,
  } = useBroaderReview(applicationId);
  useEffect(() => {
    console.log(applicationScores);
  }, [applicationScores]);
  console.log(applicationId);
  return <div></div>;
};

// {data && data.scores.length != 0 ? (
//     <table className='min-w-full text-center'>
//       {/* <TableHeader /> */}
//       {/* <TableBody scores={data.scores} /> */}
//     </table>
//   ) : (
//     <div className='text-center text-sm mt-4'>No scores found.</div>
//   )}
