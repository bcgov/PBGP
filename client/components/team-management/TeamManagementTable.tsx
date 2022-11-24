import { useAuthContext, UserInterface } from '../../contexts';
import { Button } from '../Button';

export interface TableProps {
  data: any[];
  updateAdminAccess: (id: string, grantAccess: boolean) => void;
  updatePortalAccess: (id: string, grantAccess: boolean) => void;
}

const TableHeader: React.FC = () => {
  const headers = ['User ID', 'Display Name', 'Admin Access', 'Portal Access'];
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

const TableBody: React.FC<TableProps> = ({ data, updatePortalAccess, updateAdminAccess }) => {
  const { user } = useAuthContext();
  const tdStyles =
    'table-td px-6 py-4 text-left text-sm font-strong flexitems-center justify-between';

  return (
    <tbody>
      {data.map(
        ({ id, userName, displayName, isAdmin, isAuthorized }: UserInterface, index: number) => (
          <tr
            key={`row${index}`}
            className='bg-white border-b-2 even:bg-bcGrayInput
                border-gray-200'
          >
            <td className={`${tdStyles} text-bcBluePrimary`}>{userName}</td>
            <td className={tdStyles}>{displayName}</td>
            <td className={tdStyles}>
              {isAdmin ? (
                <Button
                  type='button'
                  onClick={() => updateAdminAccess(id, false)}
                  variant='outline'
                  disabled={user?.id === id}
                >
                  Revoke Admin Access
                </Button>
              ) : (
                <Button
                  type='button'
                  onClick={() => updateAdminAccess(id, true)}
                  variant='outline'
                  disabled={user?.id === id}
                >
                  Grant Admin Access
                </Button>
              )}
            </td>
            <td className={tdStyles}>
              {isAuthorized ? (
                <Button
                  type='button'
                  onClick={() => updatePortalAccess(id, false)}
                  variant='outline'
                  disabled={user?.id === id}
                >
                  Revoke Portal Access
                </Button>
              ) : (
                <Button
                  type='button'
                  onClick={() => updatePortalAccess(id, true)}
                  variant='outline'
                  disabled={user?.id === id}
                >
                  Grant Portal Access
                </Button>
              )}
            </td>
          </tr>
        ),
      )}
    </tbody>
  );
};

export const TeamManagementTable: React.FC<TableProps> = ({
  data,
  updatePortalAccess,
  updateAdminAccess,
}) => {
  return (
    <div>
      <table className='min-w-full text-center'>
        <TableHeader />
        {data?.length > 0 ? (
          <TableBody
            data={data}
            updateAdminAccess={updateAdminAccess}
            updatePortalAccess={updatePortalAccess}
          />
        ) : (
          <p className='text-center text-sm mt-4'>No user found.</p>
        )}
      </table>
    </div>
  );
};
