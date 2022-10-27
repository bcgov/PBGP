import { Form, Formik, FormikProps } from 'formik';
import {
  Radio,
  CheckboxArray,
  Textarea,
  FormStepTitles,
  FormSteps,
} from '@components';
import { FundingEligibilityInterface } from 'constants/interfaces';

const initialValues = {
    communityServed: '',
    communityServedExplanation: '',
    facilityHas: '',
    projectAppliedFor: '',
    additionalFunding: '',

};

export const FundingEligibility: React.FC = () => {

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<FundingEligibilityInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center drop-shadow-sm'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>
                {FormStepTitles[FormSteps.FUNDING_ELIGIBILITY]}
              </h1>
              <h3>Provide detail contact information for your application. Text place holder</h3>
            </div>

            <p className='font-bold'>
              The percentage share of BCAAP funding available for your project may be increased by
              up to 15% based on whether your community, facility or project meet any of the
              following criteria (subject to verification by BCAAP staff). Please indicate which, if
              any, of the following apply, with a brief explanation for those that you so indicate:
            </p>

            <div className='flex flex- w-full justify-start'>
              <CheckboxArray
                legend='The community served is:'
                name='communityServed'
                options={[{ label: 'Indigenous, isolated, rural or remote', value: 'Indigenous' }]}
              />
            </div>

            <div className='flex flex-col w-full px-8 py-4 bg-slate-200'>
              <Textarea
                name='communityServedExplanation'
                label=''
                description='Please explain:'
                maxLength={225}
              />
            </div>

            <div className='flex flex- w-full justify-start'>
              <CheckboxArray
                legend='The facility has:'
                name='facilityHas'
                options={[
                  { label: 'Limited revenue streams available', value: 'yes' },
                  { label: 'A greenhouse gas reduction plan in place ', value: 'no' },
                  { label: 'Policies, procedures or infrastructure in place to ', value: 'yes' },
                  { label: 'Support active transportation', value: 'no' },
                ]}
              />
            </div>

            <div className='flex flex- w-full justify-start'>
              <CheckboxArray
                legend='The project being applied for is:'
                name='projectAppliedFor'
                options={[
                  { label: 'Required for medevac operations', value: 'yes' },
                  { label: 'Required for wildfire suppression operations', value: 'no' },
                  { label: 'Needed for emergency response / preparedness', value: 'yes' },
                  { label: 'Required due to an extraordinary event (e.g., flooding)', value: 'no' },
                  {
                    label: 'Required to correct a non-compliance with federal aviation regulations',
                    value: 'yes',
                  },
                  { label: 'Required for climate change mitigation / adaptation', value: 'no' },
                ]}
              />
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                legend='The percentage share of BCAAP funding available for your project may be increased by an additional 5% if you are a non-profit society registered in British Columbia for the purposes of operating this small facility and you are reliant on volunteer contributions to complete this project. Does this description apply to you?'
                name='isOneApplication'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              ></Radio>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
