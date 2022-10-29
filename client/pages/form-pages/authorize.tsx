import { Form, Formik, FormikProps } from 'formik';
import { Field, FormStepTitles, FormSteps } from '@components';
import { AuthorizationInterface } from 'constants/interfaces';

const initialValues = {
  projectManagerSignature: '',
  financialOfficerSignature: '',
};
 
export const AuthorizationPage: React.FC = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<AuthorizationInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>
                {FormStepTitles[FormSteps.AUTHORIZATION]}
              </h1>
              <h3>Please proivde detailed information for your application.</h3>
            </div>

            <p className='font-bold'>
              We certify that the information contained in this application, is to the best of our
              knowledge correct, complete and has been submitted with the concurrence of our Council
              or Board.
            </p>

            <Field
              name='projectManagerSignature'
              type='text'
              label='Project Manager, Name and Signature'
              maxLength={300}
            ></Field>
            <Field
              name='financialOfficerSignature'
              type='text'
              label='Financial Officer, Name and Signature'
              maxLength={300}
            ></Field>

            <div className='flex flex-col-1 w-full space-x-4'>
              <span className='flex-1'>
                <Field
                  name='contactEmail'
                  type='date'
                  label='Estimated start date'
                  maxLength={300}
                ></Field>
              </span>
              <span className='flex-2'></span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
