import { Form, Formik, FormikProps } from 'formik';
import { Field, Radio, Textarea } from '@components';
import { GeneralInfoInterface } from 'constants/interfaces';

const initialValues = {
  estimatedCost: '',
  projectType: '',
  facilityMasterPlan: '',
  standardCompliance: '',
  standardComplianceExplanation: '',
  estimatedStartDate: '',
  estimatedEndDate: '',
  projectTitle: '',
  projectScope: '',
  projectRationale: '',
};

export const GeneralProjectInfo: React.FC = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<GeneralInfoInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center drop-shadow-sm'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>
                General Project Information and Description
              </h1>
              <h3>Please proivde detailed information for your application.</h3>
            </div>

            <Field
              name='estimatedCost'
              description='Class B or better (in CAD):'
              type='text'
              label='Total estimated cost of project'
              maxLength={300}
            ></Field>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                legend='What type of project is being applied for?'
                name='projectType'
                description='(Please read carefully and then select the one that best fits the project)'
                options={[
                  {
                    label:
                      'Facility master plan (small facilities only, maximum BCAAP contribution is $25,000)',
                    value: 'facilityMasterPlan',
                  },
                  { label: 'Airside / core aviation infrastructure', value: 'airside' },
                  { label: 'GPS approach', value: 'gps' },
                  { label: 'Transitional infrastructure', value: 'transitional' },
                  { label: 'Groundside / ancillary infrastructure', value: 'groundside' },
                  { label: 'Climate / environmental project', value: 'climate' },
                ]}
              ></Radio>
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                legend='Is this project identified in your facility master plan? '
                name='facilityMasterPlan'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              ></Radio>
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                legend='Will the completed project comply with applicable federal, provincial and/or local government standards? '
                name='standardCompliance'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              ></Radio>
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Textarea
                name='standardComplianceExplanation'
                label='If selected “No”, please indicate why not'
                maxLength={2000}
                disabled={values.standardCompliance !== 'no' ? true : false}
              ></Textarea>
            </div>

            <div className='flex flex-1 w-full space-x-4'>
              <span className='flex-1'>
                <Field
                  name='estimatedStartDate'
                  type='text'
                  label='Estimated start date'
                  maxLength={100}
                ></Field>
              </span>
              <span className='flex-1'>
                <Field
                  name='estimatedEndDate'
                  type='text'
                  label='Estimated end date'
                  maxLength={100}
                ></Field>
              </span>
            </div>

            <Field
              name='projectTitle'
              description='Please provide a phrase of 10 or fewer words to describe your project.'
              type='text'
              label='Project title'
              maxLength={300}
            ></Field>

            <Field
              name='projectScope'
              description='Briefly and clearly outline the scope of the project.'
              type='text'
              label='Project scope'
              maxLength={500}
            ></Field>

            <div className='flex flex-1 w-full justify-start'>
              <Textarea
                name='projectRationale'
                description='Briefly and clearly explain why this project is necessary.'
                type='text'
                label='Project rationale'
                maxLength={2000}
              ></Textarea>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
