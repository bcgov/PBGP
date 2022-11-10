import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, withAuth, Stepper, Button, FormSteps } from '@components';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { PlanningSteps } from '@components';
import { FormContent } from '../components/forms';
import { PageTitle } from 'components/PageTitle';

const Dashboard: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const isFirstStep = currentStep === 1;

  // const handleClick = (clickType: any) => {
  //   let newStep = currentStep;
  //   clickType == 'next' ? newStep++ : newStep--;
  //   // Check if steps are within the boundary
  //   if (newStep > 0 && newStep <= PlanningSteps.length) {
  //     setCurrentStep(newStep);
  //   }
  // };
  return (
    <div className='flex flex-col w-full px-10 py-5 bg-white'>
      {/* <PageTitle
        title={`BC Air Access Program Application`}
        description={`Learn more about eligibility, prepare documents and deadline of the program, please click here`}
      />
      <Stepper steps={PlanningSteps} currentStep={currentStep} /> */}

      <FormContent step={currentStep} formTitle={Object.keys(FormSteps)[currentStep - 1]} />
      
      {/* <div className='flex-1 flex flex-col min-h-0'>
        <div className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex justify-between'>
            <Button variant='outline'>Cancel</Button>
            <div className='grid grid-cols-2 gap-2'>
              <Button
                variant='outline'
                type='button'
                disabled={isFirstStep}
                onClick={() => handleClick('')}
              >
                Back
              </Button>
              <Button
                variant='primary'
                type='button'
                disabled={currentStep >= PlanningSteps.length}
                onClick={() => handleClick('next')}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Dashboard)), {
  ssr: false,
});
