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

export const ApplicationTable: React.FC<Props> = applications => {
  return (
    <div>
      <table className='min-w-full text-center'>
        <TableHeader />
        {applications && applications.applications.length != 0 ? (
          <TableBody applications={applications.applications} />
        ) : (
          <p className='text-center text-sm mt-4'>No applications found.</p>
        )}
      </table>
    </div>
  );

};
