import React, { useState, useCallback } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { FormStepTitles, FormSteps, FileUpload } from '@components';
import { SupportDocsInterface } from 'constants/interfaces';

const initialValues = {
  docList: [],
};

export const SupportDocsChecklist: React.FC = () => {
  const [fileArray, setFileArray] = useState([]);

  const  fileSelectedHandler = (file: any) => {
    let addedFiles = fileArray.concat(file);
    setFileArray( addedFiles )
  }

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<SupportDocsInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>
                {FormStepTitles[FormSteps.SUPPORT_DOCUMENTATION]}
              </h1>
              <h3>Upload all supporting documentation with this application.</h3>
            </div>

            <FileUpload
              title='Quotes for work'
              onChange={fileSelectedHandler}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Council Resolution or Equivalent'
              onChange={fileSelectedHandler}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Facility Development Plan (if available)'
              onChange={fileSelectedHandler}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Environmental Assessment (if applicable)'
              onChange={fileSelectedHandler}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Other support documentations (if applicable)'
              onChange={fileSelectedHandler}
              description='File standard (format/size and more)'
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
