import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useHttp } from '../../services/useHttp';
import { Endpoints } from '../../constants';
import Link from 'next/link';
import { Button, Dropdown, Panels } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { FormSteps, FormStepTitles } from '../../constants';

type Option = {
  value: string;
  title: string;
};

interface DropdownProps {
  name?: string;
  options: Option[];
  variant?: string;
  required?: boolean;
  tabIndex?: number;
  className?: string;
  type?: string;
  placeHolder?: string;
  labelName?: string;
 
}

export function DropdownComponent({
  options,
  variant,
  placeHolder,
  type,
  required,
  className,
  tabIndex,
}: DropdownProps) {
  const [selected, isSelected] = useState<String>('');

  return (
    <div className='relative w-full lg:max-w-sm'>
      <select
        className='w-auto inline-flex justify-center items-center rounded shadow-sm px-4 py-2 text-base font-bold focus:outline-none
  disabled:opacity-50 focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:text-sm border-transparent bg-bcBluePrimary text-white hover:bg-blue-800 focus:ring-blue-500'
      >
        {options.map((option, index) => (
          <option key={index} onClick={() => isSelected(option.title)}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ApplicationDetails() {
  const [details, setDetails] = useState<any>({});
  const { fetchData } = useHttp();
  const { query } = useRouter();
  const { id } = query;

  const setApplicationDetails = async () => {
    const params = { ...query, page: 1, limit: 1, confirmationId: id };
    fetchData(
      {
        endpoint: Endpoints.APPLICATIONS,
        params,
      },
      ({ result }: any) => {
        setDetails(result[0]);
      },
    );
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      setApplicationDetails();
    })();
  }, []);

  const topStatusObj = [
    { title: 'Status', value: 'status' },
    { title: 'Facility', value: 'facilityName' },
    { title: 'Estimated cost', value: 'totalEstimatedCost' },
    { title: 'Asks', value: 'asks' },
    { title: 'Last updated', value: 'updatedAt' },
    { title: 'Updated by', value: 'status' },
  ];

  const optionsObj = [
    { title: 'Unassign', value: 'unassign' },
    { title: 'Assign to me', value: 'assign_to_me' },
    { title: 'Assign to Jean Smith', value: 'assign_to_Jean_Smith' },
    { title: 'Assign to John Doe', value: 'assign_to_John_Doe' },
  ];
  return (
    <div className='min-h-screen p-10 w-full bg-white'>
      <div className='w-full text-bcBluePrimary'>
        <Link href='/applications'>Applications</Link> | Confirmation ID: {details.confirmationId}
      </div>
      <h1 className='text-5xl w-full text-bcBluePrimary text-left mb-2'>
        {details.projectTitle || 'Project Title'}
      </h1>
      <div className='flex mb-4'>
        <div className='w-1/3 grid grid-cols-2 gap-2'>
          <Button variant='outline'>
            <FontAwesomeIcon icon={faUser} className='h-4 mr-2 text-bcBluePrimary' /> Assign
            Evaluator
          </Button>
          <Button variant='outline'>
            <FontAwesomeIcon icon={faComment} className='h-4 mr-2 text-bcBluePrimary' /> Comments
          </Button>
        </div>
        <div className='w-1/3'></div>
        <div className='w-1/3 flex justify-end grid  gap-2'>
          <DropdownComponent options={optionsObj} />
          <Dropdown variant='outline' options={optionsObj} />
        </div>
      </div>

      <div className='grid grid-cols-6 mb-4 gap-2'>
        {topStatusObj.map((item, index) => {
          return (
            <div
              key={`statusBox-${index}`}
              className={`p-2 py-5 h-24 ${
                index == 0 ? ' bg-bcBluePrimary text-white' : ' bg-gray-100'
              }  items-center text-center justify-center`}
            >
              <p className='text-sm text-slate-400'>{item.title}</p>
              <p className='text-lg'>{details[item.value]}</p>
            </div>
          );
        })}
      </div>

      {}
      <Panels title={FormStepTitles[FormSteps.CONTACT_INFO]}>
        <p>Add Component</p>
      </Panels>
      <Panels title={FormStepTitles[FormSteps.GENERAL_INFO]}>
        <p>Add Component</p>
      </Panels>
      <Panels title={FormStepTitles[FormSteps.FACILITY_INFO]}>
        <p>Add Component</p>
      </Panels>
      <Panels title={FormStepTitles[FormSteps.FUNDING_ELIGIBILITY]}>
        <p>Add Component</p>
      </Panels>
      <Panels title={FormStepTitles[FormSteps.ENVIRONMENTAL_CONSIDERATION]}>
        <p>Add Component</p>
      </Panels>
      <Panels title={FormStepTitles[FormSteps.FUNDING_INFO]}>
        <p>Add Component</p>
      </Panels>
      <Panels title={FormStepTitles[FormSteps.SUPPORT_DOCUMENTATION]}>
        <p>Add Component</p>
      </Panels>
      <Panels title={FormStepTitles[FormSteps.AUTHORIZATION]}>
        <p>Add Component</p>
      </Panels>

      {/* <div className='w-full'>{JSON.stringify(details, null, 4)}</div> */}
    </div>
  );
}
