import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { FormStepTitles, FormSteps, FileUpload } from '@components';
import { SupportDocsInterface } from 'constants/interfaces';

const initialValues = {
  docList: [],
};

export const SupportDocsChecklist: React.FC = () => {
  const [fileArray, setFileArray] = useState<any>([]);
  
  const  handleChange = (file: any) => {
    let name = file[0].name;
    setFileArray((p: any) => [...p, String(name)]);
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
              handleChange={handleChange}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Council Resolution or Equivalent'
              handleChange={handleChange}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Facility Development Plan (if available)'
              handleChange={handleChange}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Environmental Assessment (if applicable)'
              handleChange={handleChange}
              description='File standard (format/size and more)'
            />
            <FileUpload
              title='Other support documentations (if applicable)'
              handleChange={handleChange}
              description='File standard (format/size and more)'
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
