import { Form, Formik, FormikProps } from 'formik';
import { Field, Radio, Select, Option, FormStepTitles, FormSteps } from '@components';
import { FundingProjectCostInfoInterface } from 'constants/interfaces';

const initialValues = {
  contingencyPlan: '',
  contingencyPlanExplanation: '',
  totalEstimatedCost: '',
  potentialBCAAPShare: '',
  thirdPartyContributions: '',
  applicantShare: '',
  totalRequest: '',
};

export const FundingProjectCostInfo: React.FC = () => {
  
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<FundingProjectCostInfoInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>
                {FormStepTitles[FormSteps.FUNDING_INFO]}
              </h1>
              <h3>Please proivde detailed information for your application.</h3>
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                title=''
                legend='If your application is approved, a Conditional Grant Agreement will be issued which will define the maximum BCAAP contribution to this project based on the cost information provided in this application. Your organization will be solely responsible for any cost overruns. Do you have a contingency plan in place to ensure the project will be completed if costs increase?'
                name='contingencyPlan'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              ></Radio>
            </div>
            <Field
              name='totalEstimatedCost'
              type='text'
              label='A. Total estimated cost of project (brought forward from earlier)'
              maxLength={300}
            ></Field>
            <Field
              name='potentialBCAAPShare'
              type='text'
              label='B. Potential BCAAP share (subject to confirmation by BCAAP staff )'
              maxLength={300}
            ></Field>
            <Field
              type='text'
              name='thirdPartyContributions'
              label='C. Third Party Contributions'
              maxLength={300}
            ></Field>
            <Field
              name='applicantShare'
              type='text'
              label='D. Applicant Share'
              maxLength={300}
            ></Field>
            <Field
              name='totalRequest'
              type='text'
              label='Total Request Being Made of BCAAP (A-C-D, not to exceed B)'
              maxLength={300}
            ></Field>
          </div>
        </Form>
      )}
    </Formik>
  );
};
