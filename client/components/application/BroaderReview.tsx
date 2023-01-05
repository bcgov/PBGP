import { useEffect, useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import { useHttp, useApplicationScores, useTeamManagement } from '../../services';
import { Button, TooltipIcon } from '../generic';
import {
  EvaluationBoardData,
  defaultBroadReviewValues,
  API_ENDPOINT,
  REQUEST_METHOD,
} from '../../constants';
import { Field, Textarea } from '../form';
import { toast } from 'react-toastify';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserInterface } from '../../contexts';
import { useAuthContext } from '../../contexts';

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
  selectedUser: string;
  obj?: ObjReviewProps[] | null | undefined;
};

export const BroderReviewUsers: React.FC<any> = ({ user, selected, handleClick, id }) => {
  return (
    <Button
      variant={selected ? 'primary' : 'outline'}
      type='button'
      key={user.id}
      onClick={handleClick}
      customClass='mb-2 ml-2'
    >
      {user.id != id ? user.displayName : 'My Review'}
    </Button>
  );
};

export const BroderReviewInput: React.FC<LabelReviewProps> = ({
  label,
  name,
  description,
  tooltiptext,
  selectedUser,
}) => {
  const { user } = useAuthContext();

  return (
    <div className='md:flex md:items-center mb-3'>
      <div className='md:w-3/4'>
        {label && (
          <div className=''>
            <div className='text-bcBluePrimary font-bold'>
              {label} <TooltipIcon icon={faExclamationCircle} text={tooltiptext} style='h-4 w-4' />
            </div>
            <div className='text-bcBluePrimary'>{description}</div>
          </div>
        )}
      </div>

      <div className='ml-4 w-14 -mt-2 md:w-1/4 ml-4'>
        <Field
          name={name}
          type='number'
          label=''
          disabled={user && user.id != selectedUser}
          className={`w-14 text-center ${
            user && user.id != selectedUser ? 'bg-slate-100' : ''
          } BroderReviewInput border border-gray-400 bg-white pl-2 py-2 rounded`}
        />
      </div>
    </div>
  );
};

export const FinalScore: React.FC<any> = () => {
  const { values } = useFormikContext();
  const [total, setTotal] = useState<number>();

  function addScores(array: any) {
    let sum = 0;
    array.forEach((item: any) => {
      sum += item;
    });
    return sum;
  }

  useEffect(() => {
    if (!values) return;
    const total = Object.values(values.data);
    setTotal(addScores(total));
  }, [values]);

  return (
    <div className='flex'>
      <div className='w-3/4 p-2'>
        <label className='text-xl'>FinalScore</label>
      </div>
      <div className='w-1/4 p-2'>
        <input
          type='number'
          name='finalScore'
          disabled
          value={total}
          className='w-14 text-center bg-slate-100 BroderReviewInput border border-gray-400 bg-white pl-2 py-2 rounded'
        />
      </div>
    </div>
  );
};

export const BroaderReview: React.FC<BroaderReviewProps> = ({ applicationId }) => {
  const { sendApiRequest } = useHttp();
  const { applicationScores, fetchApplicationScores } = useApplicationScores(applicationId);
  const [selectedUser, setSelectedUser] = useState<string | undefined>('');
  const [applicationScoresByScorer, setApplicationScoresByScorer] = useState<any>();
  const { userData } = useTeamManagement();
  const { user } = useAuthContext();
  const [newScore, setNewScore] = useState<boolean>(true);
  const [scoreId, setScoreId] = useState<string>('');

  // Check if scorer has already scored application
  const handleApplicationScoresByUser = () => {
    const singleScore = applicationScores.filter((item: any) => item.user == selectedUser);
    let data = {};
    if (singleScore.length > 0) {
      setScoreId(singleScore[0].id);
      setNewScore(false);
      data = singleScore[0];

      if (Object.keys(singleScore[0].data).length == 0) {
        //data = { data: defaultBroadReviewValues, overallComments: singleScore[0].overallComments };
        data.data = defaultBroadReviewValues;
        setApplicationScoresByScorer(data);
        return;
      }
      setApplicationScoresByScorer(data);
    } else {
      const test = { data: defaultBroadReviewValues, overallComments: '' };
      setApplicationScoresByScorer(test);
    }
  };

  useEffect(() => {
    if (applicationScores.length == 0) return;
    handleApplicationScoresByUser();
  }, [applicationScores]);

  useEffect(() => {
    if (applicationScores.length == 0) return;
    handleApplicationScoresByUser();
  }, [selectedUser]);

  useEffect(() => {
    const id = user && user.id;
    setSelectedUser(id);
  }, []);

  function addScores(array: any) {
    let sum = 0;
    array.forEach((item: any) => {
      sum += item;
    });
    return sum;
  }

  const handleSubmit = (values: any) => {
    const obj = { data: {}, overallComments: '', finalScore: 0 };
    // calculate all score values for finalScore
    const total = Object.values(values.data);

    obj.data = values.data;
    obj.finalScore = addScores(total);
    obj.overallComments = values.overallComments;

    sendApiRequest(
      {
        endpoint: newScore
          ? API_ENDPOINT.getApplicationScores(applicationId)
          : API_ENDPOINT.updateApplicationScores(applicationId, scoreId),
        method: newScore ? REQUEST_METHOD.POST : REQUEST_METHOD.PATCH,
        data: obj,
      },
      () => {
        toast.success('UPDATED score successful!');
        // update score with new data
        fetchApplicationScores();
      },
    );
  };

  const handleChangeScorer = (id: string) => {
    setSelectedUser(id);
  };

  return (
    <Formik
      initialValues={applicationScoresByScorer}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {() => (
        <Form className=''>
          <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm'>
            <div className='leading-6 p-2 bg-gray-100 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
              <div className='flex'>
                <div className='w-1/2 p-2'>Evaluation Board</div>
                <div className='w-1/2 flex justify-end'>
                  {selectedUser == user.id && (
                    <Button variant='primary' customClass='py-2 ' type='submit'>
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className='p-4 grid grid-flow-row gap-4'>
                <div>
                  {userData &&
                    userData.map((item: any, index: number) => {
                      return (
                        <BroderReviewUsers
                          key={`BroderReviewUsers_${index}`}
                          user={item}
                          id={user.id}
                          selected={selectedUser == item.id}
                          handleClick={() => handleChangeScorer(item.id)}
                        />
                      );
                    })}

                  <div className='mt-4 bg-white pt-4 pb-4'>
                    {EvaluationBoardData.map((item, index) => (
                      <>
                        <BroderReviewInput
                          key={`BroderReviewInput_${index}`}
                          obj={item.obj}
                          label={item.label}
                          description={item.description}
                          name={item.name}
                          selectedUser={selectedUser}
                          tooltiptext={item.tooltiptext}
                        />
                      </>
                    ))}
                  </div>
                  <Textarea
                    name='overallComments'
                    label='Overall comments'
                    disabled={user && user.id != selectedUser}
                  />
                  <FinalScore />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
