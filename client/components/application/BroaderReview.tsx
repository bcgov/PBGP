import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useHttp } from '../../services/useHttp';
import { Button } from '../generic/Button';
import { Textarea, Field, Label, Select, Option } from '../form';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINT, CommentResponseType, CommentType } from '../../constants';
import { UserInterface } from '../../contexts';

export type BroaderReviewProps = {
  applicationId: string;
  users: UserInterface[];
  onClose: () => void;
};

export type ObjReviewProps = {
  text: string;
  value: string;
};

export type LabelReviewProps = {
  label?: string;
  name: string;
  description?: string;
  obj?: ObjReviewProps[];
};

const projectScopeObj = [
  { value: 'Airside', text: 'Airside / core aviation infrastructure' },
  { value: 'Transitional', text: 'Transitional infrastructure' },
  { value: 'Groundside', text: 'Groundside / ancillary infrastructure' },
  { value: 'Climate', text: 'Climate / environmental project' },
  { value: 'Facility', text: 'Facility master plan' },
  { value: 'GPS', text: 'GPS approach' },
];

export const BroderReviewInput: React.FC<LabelReviewProps> = ({
  label,
  name,
  obj,
  description,
}) => {
  return (
    <div className='md:flex md:items-center mb-2'>
      <div className='md:w-3/4'>
        {label && (
          <div className='mb-4'>
            <p className='text-bcBluePrimary font-bold'>{label}</p>

            <p className='text-bcBluePrimary'>{description}</p>
          </div>
        )}
      </div>
      <div className='md:w-1/4 ml-4'>
        {obj && (
          <Select label='' name='outline' disabled={false}>
            {obj &&
              obj.map((option, index) => (
                <Option
                  label={option.text}
                  value={option.value}
                  selected={index === 0 ? true : false}
                  key={index}
                ></Option>
              ))}
          </Select>
        )}
      </div>
      <div className='md:w-1/4 ml-4'>
        <Field name={name} type='number' label='' />
      </div>
    </div>
  );
};

export const BroaderReview: React.FC<BroaderReviewProps> = ({ applicationId, users, onClose }) => {
  const { fetchData, sendApiRequest } = useHttp();
  const [applicationScores, setApplicationScores] = useState<any[]>([]);

  const fetchApplicationScores = () => {
    fetchData(
      {
        endpoint: API_ENDPOINT.getApplicationScores(applicationId),
      },
      (data: any) => {
        setApplicationScores(data.comments);
      },
    );
  };

    const postComment = (data: any, { setStatus, resetForm }: any) => {
        console.log("++++++++++ SAVE ", data)
      return;
      sendApiRequest(
        {
          endpoint: API_ENDPOINT.getApplicationComments(applicationId),
          method: 'POST',
          data,
        },
        () => {
          toast.success('Comment added successfully!!');
          resetForm({
            comment: '',
          });
          setStatus({ success: true });
          //setApplicationScores();
        },
      );
    };

  useEffect(() => {
    if (applicationId) {
      fetchApplicationScores();
    }
  }, []);

  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={postComment}
      enableReinitialize={true}
    >
      {() => (
        <div
          className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm overflow-y-auto'
          style={{ height: '90%' }}
        >
          <div className='leading-6 bg-gray-100 p-4 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
            <div className='flex'>
              <div className='w-1/2'>Evaluation Board</div>
              <div className='w-1/2 flex justify-end'>
                <Button type='submit' variant='primary'>
                  Save
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className='p-6 grid grid-flow-row gap-4'>
              <div>
                <Button variant='default'>My review</Button>
                <Button variant='outline'>
                  <div className='rounded-full h-6 w-6 flex items-center justify-center bg-green-600'>
                    <FontAwesomeIcon icon={faCheck} className='h-4 w-4 text-white ' />
                  </div>
                  John (completed)
                </Button>
                <Button variant='outline'>Jenna (In progress)</Button>
                {/* <Formik
              initialValues={{
                comment: '',
              }}
              onSubmit={postComment}
              enableReinitialize={true}
            >
              {() => ( */}
                <Form className='mb-4 bg-white rounded-lg rounded-t-lg  '>
                  <hr className='mt-4 mb-4' />

                  <BroderReviewInput
                    obj={projectScopeObj}
                    label='What type of project is being applied for?'
                    description='Project scope?'
                    name='projectScope'
                  />
                  <BroderReviewInput
                    name='needForProject'
                    label='Need for project?'
                    description='Drawn from Project Rationale'
                  />
                  <BroderReviewInput
                    name='needForFunding'
                    label='Need for funding?'
                    description='Drawn from Project Rationale'
                  />
                  <BroderReviewInput
                    name='pastBcaapFunding'
                    label='Past BCAAP funding?'
                    description='BCAAP staff to evaluate this line'
                  />
                  <BroderReviewInput
                    obj={[
                      { value: 'yes', text: 'Yes' },
                      { value: 'no', text: 'No' },
                      { value: 'N/A', text: 'N/A' },
                    ]}
                    name='facilityMasterPlan'
                    label='Is this project identified in your facility master plan?'
                    description='BCAAP staff to evaluate this line'
                  />

                  <Textarea name='comment' label='Your comments...' />
                  <Button variant='primary' type='submit'>
                    Post comment
                  </Button>

                  <hr className='mt-4 mb-4' />

                  <div className='mb-4'>
                    <p className='text-bcBluePrimary font-bold'>Need for project (Weight 5)</p>
                    <p className='text-bcBluePrimary'>Drawn from Project Rationale</p>
                  </div>

                  <BroderReviewInput obj={projectScopeObj} name='infrastructure' label='' />

                  <hr className='mt-4 mb-4' />

                  <div className='mb-4'>
                    <p className='text-bcBluePrimary font-bold'>Need for project(Weight 5)</p>
                    <p className='text-bcBluePrimary'>From project rationale</p>
                  </div>
                  <BroderReviewInput obj={projectScopeObj} name='infrastructure' label='' />
                </Form>
                {/* )}
            </Formik> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
