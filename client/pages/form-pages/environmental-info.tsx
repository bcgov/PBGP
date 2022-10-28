import { Form, Formik, FormikProps } from 'formik';
import {
  Textarea,
  FormStepTitles,
  FormSteps,
} from '@components';
import { EnvironmentalInfoInterface } from 'constants/interfaces';

const initialValues = {
  environmentalProjectDescription: '',
  environmentalGoals: '',
  projectStrategy: '',
  successAssessment: '',
};

export const EnvironmentalConsiderations: React.FC = () => {
  
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<EnvironmentalInfoInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>
                {FormStepTitles[FormSteps.ENVIRONMENTAL_CONSIDERATION]}
              </h1>
              <h3>Please complete this section to the best of your ability. Detailed numbers such as anticipated greenhouse gas reductions are welcome but not required. All projects must be based on the highest environmental standards.</h3>
            </div>

            <div className='flex flex-col w-full'>
              <Textarea
                name='environmentalProjectDescription'
                label='Outline the benefits of the project from an environmental and/or climate perspective.'
                maxLength={225}
              />
            </div>

            <div className='flex flex-col w-full'>
              <Textarea
                name='environmentalGoals'
                label='How are best practices from an environmental and/or climate perspective incorporated into the design and construction of this project?'
                maxLength={225}
              />
            </div>

            <div className='flex flex-col w-full'>
              <Textarea
                name='projectStrategy'
                label='Have any specific environmentally related risks been identified with this project and, if yes, what is your planning for addressed these risks?'
                maxLength={225}
              />
            </div>

            <div className='flex flex-col w-full'>
              <Textarea
                name='successAssessment'
                label='Is any type of innovation from an environmental and/or climate perspective being incorporated into this project?'
                maxLength={225}
              />
            </div>

           

          </div>
        </Form>
      )}
    </Formik>
  );
};
