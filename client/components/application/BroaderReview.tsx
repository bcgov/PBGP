import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useHttp, useApplicationScores, useTeamManagement } from '../../services';
import { Button } from '../generic';
import {
  EvaluationBoardData,
  defaultBroadReviewValues,
  API_ENDPOINT,
  REQUEST_METHOD,
  BROADER_REVIEW_VALIDATION_SCHEMA,
  ReviewCompletionStatus,
} from '../../constants';
import { Textarea, Radio, Error } from '../form';
import { toast } from 'react-toastify';
import { UserInterface, useAuthContext } from '../../contexts';
import { FinalScore, Input, UserView } from '../broader-review';

export type BroaderReviewProps = {
  applicationId: string;
  users: UserInterface[];
  onClose: () => void;
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
    // If there are no entries in the database
    if (applicationScores?.length == 0) {
      setDefaultScoreValues();
      return;
    }

    // If there are entries in the database
    const singleScore = applicationScores.filter((item: any) => item.user == selectedUser);
    let data;
    if (singleScore.length > 0) {
      setScoreId(singleScore[0].id);
      setNewScore(false);
      data = singleScore[0];

      // if (Object.keys(singleScore[0].data).length == 0) {
      //   data.data = defaultBroadReviewValues;
      //   setApplicationScoresByScorer(data);
      //   return;
      // }

      setApplicationScoresByScorer({
        ...defaultBroadReviewValues,
        ...(data?.data ?? {}),
        overallComments: data?.overallComments ?? '',
        finalScore: data?.finalScore,
        completionStatus: data?.completionStatus,
      });
    } else {
      setDefaultScoreValues();
    }
  };

  const setDefaultScoreValues = () => {
    setApplicationScoresByScorer({ ...defaultBroadReviewValues, overallComments: '' });
  };

  useEffect(() => {
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
      if (Number.isInteger(item)) {
        sum += Number(item);
      }
    });
    return sum;
  }

  const handleSubmit = (values: any) => {
    const { overallComments, finalScore, completionStatus, ...data } = values;

    const obj = { data, overallComments, finalScore, completionStatus };
    // calculate all score values for finalScore
    const total = Object.values(data);
    obj.finalScore = addScores(total);

    //TODO: Check if the user is submitting/saving their own review - if not throw error
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
      validationSchema={BROADER_REVIEW_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      key={applicationId}
    >
      <Form>
        <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm'>
          <div className='leading-6 p-2 bg-gray-100 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
            <div className='flex'>
              <div className='w-1/2 p-2'>Evaluation Board</div>
              <div className='w-1/2 flex justify-end'>
                {user && selectedUser == user.id && (
                  <Button
                    variant='primary'
                    customClass='py-2 '
                    type='submit'
                    disabled={user && user.id != selectedUser}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className='p-4 grid grid-flow-row gap-4'>
              <div>
                {/* TODO: User list on who's reviewing and completed should be fetched from the backend for each application */}
                {userData &&
                  userData.map((item: any, index: number) => {
                    const scoreStatus = applicationScores.filter((i: any) => item.id == i.user);
                    return (
                      <UserView
                        key={`BroderReviewUsers_${index}`}
                        user={item}
                        scoreStatus={scoreStatus}
                        id={user && user.id}
                        selected={selectedUser == item.id}
                        handleClick={() => handleChangeScorer(item.id)}
                      />
                    );
                  })}

                <div className='mt-4 bg-white pt-4 pb-4'>
                  {EvaluationBoardData.map((item, index) => (
                    <div key={`BroderReviewInput_${selectedUser}_${index}`} className='mb-3'>
                      <Input
                        obj={item.obj}
                        label={item.label}
                        description={item.description}
                        name={item.name}
                        selectedUser={selectedUser || ''}
                        tooltiptext={item.tooltiptext}
                      />
                      <Error name={item.name} />
                    </div>
                  ))}
                </div>
                <Textarea
                  name='overallComments'
                  label='Overall comments'
                  disabled={user && user.id != selectedUser}
                />
                <FinalScore />

                {user && selectedUser == user.id && (
                  <div className='flex flex-1 w-full justify-start'>
                    <Radio
                      title='Status'
                      legend='Select status for your score on this application.'
                      name='completionStatus'
                      horizontal={true}
                      options={[
                        { label: 'In Progress', value: ReviewCompletionStatus.IN_PROGRESS },
                        { label: 'Completed', value: ReviewCompletionStatus.COMPLETE },
                      ]}
                    ></Radio>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
