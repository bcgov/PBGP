import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, withAuth, Stepper, Button } from '@components';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { PlanningSteps } from '../constants';
import { FormContent } from '../components/forms';
import { PageTitle } from 'components/PageTitle';

const Dashboard: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const isFirstStep = currentStep === 1;

  const handleClick = (clickType: any) => {
    let newStep = currentStep;
    clickType == 'next' ? newStep++ : newStep--;
    // Check if steps are within the boundary
    if (newStep > 0 && newStep <= PlanningSteps.length) {
      setCurrentStep(newStep);
    }
  };
  return (
    <div className='h-screen flex flex-col w-full px-10 py-5 bg-white'>
      <PageTitle
        title={`BC Air Access Program Application`}
        description={`Learn more about eligibility, prepare documents and deadline of the program, please click here`}
      />

      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Stepper steps={PlanningSteps} currentStep={currentStep} />

         <div className="">
            <FormContent step={currentStep} formTitle={PlanningSteps[currentStep - 1]} />
            
            <div className='flex justify-between w-full'>
              <Button variant='outline'>Cancel</Button>
              <div>
                <Button variant='outline' type='button' disabled={isFirstStep} onClick={handleClick}>
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
        </Form>
      </Formik>

      {/* <p>
        The BC Air Access Program (BCAAP) is an application-based program that provides capital
        cost-sharing contributions to aviation infrastructure projects. This includes facility
        master plans, greenhouse gas audits or baselining, and GPS approaches. Support to the
        aviation sector is critical to helping BC address its responsibilities concerning medevac,
        wildfire suppression, emergency response, access to remote (often Indigenous) communities,
        clean transportation, tourism, and economic development. BCAAP will consider applications
        from public-use airports, heliports and water aerodromes located in BC except for airports
        serving over 1 million scheduled passengers annually and airports owned and operated by the
        federal government. In the assessment phase, applications will be reviewed based on the
        following priorities: o Safety is always paramount o Core aviation infrastructure above
        ancillary infrastructure o Maintaining existing infrastructure before expansionary projects
        o Emergency services support (medevac / fire suppression / emergency response and
        preparedness) ahead of economic justifications o Focus on smaller facilities BCAAP funding
        is capped at $2 million per facility per application intake. Multiple applications can be
        made to the program in a single application intake. In the case of multiple applications,
        the $2 million BCAAP funding cap applies to the combined value of all funding approved. A
        separate application must be completed for each project and the applicant must clearly
        identify the relative priority of each application. The application deadline is For further
        assistance or inquiries, please contact the BCAAP team at 778.974.5468 or BCAAP@gov.bc.ca.
      </p>
      <div className='flex justify-center'>
        <Link variant='primary' href='#'>
          Start Application
        </Link>
      </div> */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Dashboard)), {
  ssr: false,
});
