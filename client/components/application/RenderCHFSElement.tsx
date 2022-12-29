import Image from 'next/image';
import { API_ENDPOINT } from '../../constants';
import { useHttp } from '../../services/useHttp';
import { Button } from '../generic';

const TYPE_AS_STRING = [
  'textfield',
  'simpletextfield',
  'textarea',
  'simpletextarea',
  'radio',
  'simpleradios',
  'select',
  'currency',
  'day',
  'phoneNumber',
];

const NESTED_COMPONENTS = ['simplecols2'];

const NOT_TO_BE_RENDERED = ['button', 'simplecontent', 'htmlelement'];

const renderStringElement = (e: any, data: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    <span>{data[e.key] ?? '-'}</span>
  </>
);

const renderSelectBoxes = (e: any, data: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    <span>
      {' '}
      {Object.entries(data[e.key])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ?.filter(([_, value]) => value)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([key, _]) => key)
        .join(', ')}
    </span>
  </>
);

const renderDataMap = (e: any, data: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    {Object.entries(data[e.key]).map(([key, value]) => (
      <span key={key}>{`${key}: ${value ?? '-'}`}</span>
    ))}
  </>
);

const renderDataGrid = (e: any, data: any, downloadFile: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    {data[e.key]?.map((eachFormData: any) =>
      e?.components?.map((e: any) => renderElement(e, eachFormData, downloadFile)),
    )}
  </>
);

const renderFile = (e: any, data: any, downloadFile: any) => {
  return (
    <>
      <span className='font-bold'>{e.label}</span>
      {data[e.key]?.length == 1 && (
        <Button variant='link' onClick={() => downloadFile(data[e.key][0])}>
          {data[e.key][0]['originalName']}
        </Button>
      )}
    </>
  );
};

const renderSignature = (e: any, data: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    <Image src={data[e.key]} alt={e.label} width='50' height='100' />
  </>
);

const renderRespectiveElement = (e: any, formData: any, downloadFile: any) => {
  switch (e.type) {
    case 'selectboxes':
      return renderSelectBoxes(e, formData);
    case 'datamap':
      return renderDataMap(e, formData);
    case 'datagrid':
      return renderDataGrid(e, formData, downloadFile);
    case 'simplefile':
      return renderFile(e, formData, downloadFile);
    case 'signature':
      return renderSignature(e, formData);
    default:
      if (TYPE_AS_STRING.includes(e.type)) {
        return renderStringElement(e, formData);
      }
      return (
        <>
          <h3> Not a simple component {e.type}</h3>
          <h3>{e.label}</h3>
          <h3>{JSON.stringify(formData[e.key])}</h3>
        </>
      );
  }
};

const renderElement = (e: any, formData: any, downloadFile: any) => (
  <div key={e.key} className='w-fit grid grid-flow-row'>
    {renderRespectiveElement(e, formData, downloadFile)}
  </div>
);

export const RenderCHFSElement: React.FC<any> = ({ component, formData }) => {
  const { fetchData } = useHttp();

  const downloadFile = (data: any) => {
    fetchData(
      {
        endpoint: API_ENDPOINT.getApplicationAttachments(data.data.id),
        responseType: 'blob',
      },
      (response: any) => {
        const href = URL.createObjectURL(response);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${data.originalName}`); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      },
    );
  };

  return !component.hidden && !NOT_TO_BE_RENDERED.includes(component.type) ? (
    !NESTED_COMPONENTS.includes(component.type) ? (
      renderElement(component, formData, downloadFile)
    ) : (
      <>
        {component.columns?.map((eachCol: any) =>
          eachCol?.components?.map((e: any) => renderElement(e, formData, downloadFile)),
        )}
      </>
    )
  ) : (
    <></>
  );
};
