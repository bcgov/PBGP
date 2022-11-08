import React, { useState, useRef } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { Field, FormStepTitles, FormSteps, Button } from '@components';
import { AuthorizationInterface } from 'constants/interfaces';
import SignaturePad from 'react-signature-canvas';
import SignatureCanvas from 'react-signature-canvas';

const initialValues = {
  projectManagerSignature: '',
  financialOfficerSignature: '',
};

const SignPad: React.FC<any> = () => {
  const [dataURL, setDataURL] = useState<string | null>(null);
  const [showSign, setShowSign] = useState<boolean | null>(false);
  let padRef = useRef<SignatureCanvas>(null);
  const clear = () => {
    padRef.current?.clear();
  };
  const trim = () => {
    const url = padRef.current?.getTrimmedCanvas().toDataURL('image/png');
    if (url) setDataURL(url);
    setShowSign(false);
  };
  return (
    <div className='w-full'>
      {dataURL ? (
        <div className='w-full flex justify-between p-4'>
          <img className={'sigImage'} src={dataURL} alt='user generated signature' />
        </div>
      ) : null}
      {showSign && (
        <SignaturePad
          ref={padRef}
          canvasProps={{ className: 'sigCanvas w-full border-2 mb-2 border-gray-200' }}
        />
      )}
      <div className='sigPreview flex justify-between'>
        {!showSign ? (
          <>
            <div></div>
            <Button variant='outline' onClick={() => setShowSign(true)}>
              Sign
            </Button>
          </>
        ) : (
          <>
            <Button variant='outline' onClick={clear}>
              Clear
            </Button>
            <Button variant='primary' onClick={trim}>
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
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
              <p>Please proivde detailed information for your application.</p>
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
            <SignPad />

            <Field
              name='financialOfficerSignature'
              type='text'
              label='Financial Officer, Name and Signature'
              maxLength={300}
            ></Field>
            <SignPad />
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
