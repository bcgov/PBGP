import { API_ENDPOINT, REQUEST_METHOD } from '@constants';
import xlsx from 'json-as-xlsx';
import { useHttp } from './useHttp';

const settings = {
  fileName: 'MySpreadsheet', // Name of the resulting spreadsheet
  extraLength: 3, // A bigger number means that columns will be wider
  writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
  writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
  RTL: false, // Display the columns from right-to-left (the default value is false)
};

export const useDownloadXlsx = () => {
  const { sendApiRequest } = useHttp();
  const downloadXlsx = () => {
    sendApiRequest(
      {
        endpoint: API_ENDPOINT.APPLICATIONS_RAW_DATA,
        method: REQUEST_METHOD.POST,
      },
      (data: any) => {
        xlsx(data, settings);
      },
    );
  };

  return { downloadXlsx };
};
