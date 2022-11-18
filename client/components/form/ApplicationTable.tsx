import { ApplicationDataInterface } from '../../constants/interfaces';

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

const TableBody: React.FC<Props> = data => {
  const handleSelectRow = (index: number) => {
    alert(index);
  };
  const tdStyles =
    'table-td px-6 py-4 text-left text-sm font-strong flexitems-center justify-between';
  return (
    <tbody>
      {data.applications &&
        data.applications.map((row: any, index: number) => (
          <tr
            key={`row${index}`}
            onClick={() => handleSelectRow(row.BCAAP_Form_ID)}
            className='bg-white border-b-2 even:bg-bcGrayInput
              border-gray-200'
          >
            <td className={tdStyles}>{row.confirmationId}</td>
            <td className={tdStyles}>{row.facilityName}</td>
            <td className={tdStyles}>{row.Assigned_To}</td>
            <td className={tdStyles}>{row.createdAt}</td>
            <td className={tdStyles}>{row.Status}</td>
            <td className={tdStyles}>{row.assignedTo}</td>
            <td className={tdStyles}>{row.updatedAt}</td>
            <td className={tdStyles}>{row.status}</td>
          </tr>
        ))}
    </tbody>
  );
};

export const ApplicationTable: React.FC<Props> = data => {
  return (
    <div>
      <table className='min-w-full text-center'>
        <TableHeader />
        {data && data.applications.length != 0 ? (
          <TableBody applications={data.applications} />
        ) : (
          <p className='text-center text-sm mt-4'>No applications found.</p>
        )}
      </table>
    </div>
  );
};
