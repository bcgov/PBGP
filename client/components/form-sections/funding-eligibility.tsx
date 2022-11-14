import { Form, Formik, FormikProps } from 'formik';
import { Radio, Textarea, CheckBoxExplain, FormStepTitles, FormSteps } from '@components';
import { FundingEligibilityInterface } from 'constants/interfaces';

const initialValues = {
  indigenousCommunityServed: '',
  indigenousCommunityServedExplanation: '',
  revenueStream: '',
  revenueStreamExplanation: '',
  greenhouseReductionPlan: '',
  greenhouseReductionPlanExplanation: '',
  activeTransportationSupported: '',
  activeTransportationSupportExplanation: '',
  requiredForMedevac: '',
  requiredForMedevacExplanation: '',
  requiredForWildfireSuppression: '',
  requiredForWildfireSuppressionExplanation: '',
  requiredForEmergency: '',
  requiredForEmergencyExplanation: '',
  requiredForExtraordinaryEvent: '',
  requiredForExtraordinaryEventExplanation: '',
  requiredToCorrectNonCompliance: '',
  requiredToCorrectNonComplianceExplanation: '',
  requiredForClimateChange: '',
  requiredForClimateChangeExplanation: '',
  BCAAPFunding: '',
  BCAAPFundingExplanation: '',
};

export const FundingEligibility: React.FC = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<FundingEligibilityInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center'>
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

            <fieldset className='w-full gap-2'>
              <legend className='text-xl text-bcBlack font-bold w-full'>
                The community served is:
              </legend>
              <CheckBoxExplain
                name='indigenousCommunityServed'
                value={values.indigenousCommunityServed}
                textvalue={values.indigenousCommunityServedExplanation}
                label='Indigenous, isolated, rural or remote'
              />
            </fieldset>

            <fieldset className='w-full gap-2'>
              <legend className='text-xl text-bcBlack font-bold w-full'>The facility has:</legend>
              <CheckBoxExplain
                name='revenueStream'
                value={values.revenueStream}
                textvalue={values.revenueStreamExplanation}
                label='Limited revenue streams available'
              />
              <CheckBoxExplain
                name='greenhouseReductionPlan'
                value={values.greenhouseReductionPlan}
                textvalue={values.greenhouseReductionPlanExplanation}
                label='A greenhouse gas reduction plan in place '
              />
              <CheckBoxExplain
                name='activeTransportationSupported'
                value={values.activeTransportationSupported}
                textvalue={values.activeTransportationSupportExplanation}
                label='Policies, procedures or infrastructure in place to '
              />
              <CheckBoxExplain
                name='activeTransportationSupported'
                value={values.activeTransportationSupported}
                textvalue={values.activeTransportationSupportExplanation}
                label='Support active transportation'
              />
            </fieldset>

            <fieldset className='w-full gap-2'>
              <legend className='text-xl text-bcBlack font-bold w-full'>
                The project being applied for is:
              </legend>
              <CheckBoxExplain
                name='requiredForMedevac'
                value={values.requiredForMedevac}
                textvalue={values.requiredForMedevacExplanation}
                label='Required for medevac operations'
              />
              <CheckBoxExplain
                name='requiredForWildfireSuppression'
                value={values.requiredForWildfireSuppression}
                textvalue={values.requiredForWildfireSuppressionExplanation}
                label='Required for wildfire suppression operations'
              />
              <CheckBoxExplain
                name='requiredForEmergency'
                value={values.requiredForEmergency}
                textvalue={values.requiredForEmergencyExplanation}
                label='Needed for emergency response / preparedness'
              />
              <CheckBoxExplain
                name='requiredForExtraordinaryEvent'
                value={values.requiredForExtraordinaryEvent}
                textvalue={values.requiredForExtraordinaryEventExplanation}
                label='Required due to an extraordinary event (e.g., flooding)'
              />
              <CheckBoxExplain
                name='requiredToCorrectNonCompliance'
                value={values.requiredToCorrectNonCompliance}
                textvalue={values.requiredToCorrectNonComplianceExplanation}
                label='Required to correct a non-compliance with federal aviation regulations'
              />
              <CheckBoxExplain
                name='requiredForClimateChange'
                value={values.requiredForClimateChange}
                textvalue={values.requiredForClimateChangeExplanation}
                label='Required for climate change mitigation / adaptation'
              />
            </fieldset>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                legend='The percentage share of BCAAP funding available for your project may be increased by an additional 5% if you are a non-profit society registered in British Columbia for the purposes of operating this small facility and you are reliant on volunteer contributions to complete this project. Does this description apply to you?'
                name='BCAAPFunding'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              ></Radio>
            </div>
            {values.BCAAPFunding == 'yes' && (
              <div className='flex flex-col w-full p-4 bg-slate-200'>
                <Textarea
                  name={`BCAAPFundingExplanation`}
                  value={values.BCAAPFundingExplanation}
                  label=''
                  description='Please explain:'
                  maxLength={225}
                />
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};
