import React, {useState} from "react";
import { Form, Formik, FormikProps } from 'formik';
import { Field, Radio, Textarea, FormStepTitles, FormSteps } from '@components';
import { GeneralInfoInterface } from 'constants/interfaces';
import { useDropzone } from "react-dropzone";

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

export const SupportDocsChecklist: React.FC = () => {
    const [files, setFiles] = useState([]);
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file)
//           })
//         )
//       );
//     }
//   });

//   const images = files.map((file) => (
//     <div key={file.name}>
//       <div>
//         <img src={file.preview} style={{ width: "200px" }} alt="preview" />
//       </div>
//     </div>
//   ));

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<GeneralInfoInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center drop-shadow-sm'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>
                {FormStepTitles[FormSteps.SUPPORT_DOCUMENTATION]}
              </h1>
              <h3>Upload all supporting documentation with this application.</h3>
            </div>

            
            <h1>Drag and Drop File Uploads in React using React Drop-Zone</h1>
            {/* <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="dropFiles">Drop files here</p>
            </div>
            <div>{images}</div> */}
           
          </div>
        </Form>
      )}
    </Formik>
  );
};
