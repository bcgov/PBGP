import { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useHttp, useApplicationScores, useTeamManagement } from '../../services';
import { Button, TooltipIcon } from '../generic';
import { EvaluationBoardData, defaultBroadReviewValues } from '../../constants';
import { Field, Select, Option } from '../form';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINT } from '../../constants';
import { UserInterface } from '../../contexts';
import { BroaderReviewValues } from 'constants/interfaces';

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
  tooltiptext?: string;
  description?: string;
  obj?: ObjReviewProps[] | null | undefined;
};

export const BroderReviewUsers: React.FC<any> = ({ user, selected, handleClick }) => {
  return (
    <Button variant={selected ? 'primary' : 'outline'} key={user.id} onClick={handleClick}>
      <div className='rounded-full h-6 w-6 flex items-center justify-center bg-green-600'>
        <FontAwesomeIcon icon={faCheck} className='h-4 w-4 text-white ' />
      </div>
      {user.displayName} (completed)
    </Button>
  );
};

export const BroderReviewInput: React.FC<LabelReviewProps> = ({
  label,
  name,
  obj,
  description,
  tooltiptext,
}) => {
  return (
    <div className='md:flex md:items-center mb-2'>
      <div className='md:w-3/4'>
        {label && (
          <div className='mb-4'>
            <div className='text-bcBluePrimary font-bold'>
              {label} <TooltipIcon icon={faExclamationCircle} text={tooltiptext} style='h-4 w-4' />
            </div>
            <div className='text-bcBluePrimary'>{description}</div>
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
      <div className='p-5 md:w-1/4 ml-4 w-10'>
        <Field
          name={name}
          type='number'
          label=''
          className='w-20 text-center border border-gray-400 bg-white px-4 py-2 rounded'
        />
      </div>
    </div>
  );
};

export const BroaderReview: React.FC<BroaderReviewProps> = ({ applicationId, users, onClose }) => {
  const { fetchData, sendApiRequest } = useHttp();
  const { applicationScores, setApplicationScores, filterApplicationByScorer } =
    useApplicationScores(applicationId);
  const [scorer, setScorer] = useState<string>('');
  const [applicationScoresByScorer, setApplicationScoresByScorer] =
    useState(defaultBroadReviewValues);
  const { userData } = useTeamManagement();

  const handleApplicationScoresByScorer = () => {
    filterApplicationByScorer(scorer).map((data: any) => {
      if (Object.keys(data.data).length != 0) {
        setApplicationScoresByScorer(data.data);
      }
    });
  };

  useEffect(() => {
    handleApplicationScoresByScorer();
  }, [scorer]);

  useEffect(() => {
    handleApplicationScoresByScorer();
  }, []);

  const handleSubmit = (values: BroaderReviewValues) => {
    // console.log('+++++++++++ handleSubmit', values);
    // sendApiRequest(
    //   {
    //     endpoint: API_ENDPOINT.updateApplicationScores(applicationId),
    //     method: REQUEST_METHOD.PATCH,
    //     data: values,
    //   },
    //   () => {
    //     fetchUsers();
    //   },
    // );
  };

  const handleChangeScorer = (id: string) => {
    setScorer(id);
  };

  return (
    <Formik
      initialValues={applicationScoresByScorer}
      onSubmit={(
        values: BroaderReviewValues,
        { setSubmitting }: FormikHelpers<BroaderReviewValues>,
      ) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {() => (
        <Form className=''>
          <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm'>
            <div className='leading-6 bg-gray-100 p-4 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
              <div className='flex'>
                <div className='w-1/2'>Evaluation Board</div>
                <div className='w-1/2 flex justify-end'>
                  <button type='submit'>Save</button>
                </div>
              </div>
            </div>
            <div>
              <div className='p-4 grid grid-flow-row gap-4'>
                <div>
                  {userData &&
                    userData.map((user: any, index: number) => {
                      return (
                        <BroderReviewUsers
                          user={user}
                          selected={scorer == user.id}
                          handleClick={() => handleChangeScorer(user.id)}
                        />
                      );
                    })}
                  <div className='mt-4 bg-white overflow-y-auto pt-4 pb-4'>
                    {EvaluationBoardData.map((item, index) => (
                      <>
                        <BroderReviewInput
                          key={`BroderReviewInput_${index}`}
                          obj={item.obj}
                          label={item.label}
                          description={item.description}
                          name={item.name}
                          tooltiptext={item.tooltiptext}
                        />
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
