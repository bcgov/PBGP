import { useEffect, useState } from 'react';
import { withAuth, Stepper, Button, FormSteps } from '@components';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { PlanningSteps } from '@components';
import { FormContent } from '../components/forms';
import { PageTitle } from 'components/PageTitle';
import { useFormContext } from 'components/services/useFormContext';

useFormContext;
const Dashboard: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    state: { canProceedToNext },
    updateNextTriggered,
  } = useFormContext();

  const isFirstStep = currentStep === 1;

  const handleBack = () => {
    const newStep = currentStep - 1;

    if (newStep > 0 && newStep <= PlanningSteps.length) {
      setCurrentStep(newStep);
    }
  };
  const handleContinue = () => {
    updateNextTriggered();
  };

  useEffect(() => {
    if (canProceedToNext && currentStep >= PlanningSteps.length) return;
    setCurrentStep(Number(currentStep) + 1);
  }, [canProceedToNext]);

  return (
    <div className='flex flex-col w-full px-10 py-5 bg-white'>
      <PageTitle
        title={`BC Air Access Program Application`}
        description={`Learn more about eligibility, prepare documents and deadline of the program, please click here`}
      />
      <Stepper steps={PlanningSteps} currentStep={currentStep} />
      <FormContent step={currentStep} formTitle={Object.keys(FormSteps)[currentStep - 1]} />

      <div className='flex-1 flex flex-col min-h-0'>
        <div className='flex justify-center'>
          <Button variant='outline'>Cancel</Button>
          <Button variant='outline' type='button' disabled={isFirstStep} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant='primary'
            type='button'
            disabled={currentStep >= PlanningSteps.length}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Dashboard)), {
  ssr: false,
});
