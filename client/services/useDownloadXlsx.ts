import xlsx from 'json-as-xlsx';

const data = [
  {
    sheet: 'Adults',
    columns: [
      { label: 'User', value: 'user' }, // Top level data
      { label: 'Age', value: (row: any) => row.age + ' years' }, // Custom format
      { label: 'Phone', value: (row: any) => (row.more ? row.more.phone || '' : '') }, // Run functions
    ],
    content: [
      { user: 'Andrea', age: 20, more: { phone: '11111111' } },
      { user: 'Luis', age: 21, more: { phone: '12345678' } },
    ],
  },
  {
    sheet: 'Children',
    columns: [
      { label: 'User', value: 'user' }, // Top level data
      { label: 'Age', value: 'age', format: '# "years"' }, // Column format
      { label: 'Phone', value: 'more.phone', format: '(###) ###-####' }, // Deep props and column format
    ],
    content: [
      { user: 'Manuel', age: 16, more: { phone: 9999999900 } },
      { user: 'Ana', age: 17, more: { phone: 8765432135 } },
    ],
  },
];

const settings = {
  fileName: 'MySpreadsheet', // Name of the resulting spreadsheet
  extraLength: 3, // A bigger number means that columns will be wider
  writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
  writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
  RTL: false, // Display the columns from right-to-left (the default value is false)
};

export const useDownloadXlsx = () => {
  const downloadXlsx = () => {
    xlsx(data, settings);
  };

  return { downloadXlsx };
};
