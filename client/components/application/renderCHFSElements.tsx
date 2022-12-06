import Image from 'next/image';

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

const renderDataGrid = (e: any, data: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    {data[e.key]?.map((eachFormData: any) =>
      e?.components?.map((e: any) => renderElement(e, eachFormData)),
    )}
  </>
);

const renderFile = (e: any, data: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    {data[e.key]?.length == 1 && <span>{data[e.key][0]['originalName']}</span>}
  </>
);

const renderSignature = (e: any, data: any) => (
  <>
    <span className='font-bold'>{e.label}</span>
    <Image src={data[e.key]} alt={e.label} width='50' height='100' />
  </>
);

const renderRespectiveElement = (e: any, formData: any) => {
  switch (e.type) {
    case 'selectboxes':
      return renderSelectBoxes(e, formData);
    case 'datamap':
      return renderDataMap(e, formData);
    case 'datagrid':
      return renderDataGrid(e, formData);
    case 'simplefile':
      return renderFile(e, formData);
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

const renderElement = (e: any, formData: any) => (
  <div key={e.key} className='w-fit grid grid-flow-row'>
    {renderRespectiveElement(e, formData)}
  </div>
);

export const renderCHFSElements = (component: any, formData: any) => {
  return !component.hidden && !NOT_TO_BE_RENDERED.includes(component.type) ? (
    !NESTED_COMPONENTS.includes(component.type) ? (
      renderElement(component, formData)
    ) : (
      <>
        {component.columns?.map((eachCol: any) =>
          eachCol?.components?.map((e: any) => renderElement(e, formData)),
        )}
      </>
    )
  ) : (
    <></>
  );
};
