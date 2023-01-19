import { Formik, Form } from 'formik';
import { useApplicationScores } from '../../services';
import { Button, Spinner } from '../generic';
import {
  EvaluationBoardData,
  BROADER_REVIEW_VALIDATION_SCHEMA,
  ReviewCompletionStatus,
} from '../../constants';
import { Textarea, Radio, Error } from '../form';
import { UserInterface } from '../../contexts';
import { FinalScore, Input, UserView } from '../broader-review';

export type BroaderReviewProps = {
  applicationId: string;
  users: UserInterface[];
  onClose: () => void;
};

export const BroaderReview: React.FC<BroaderReviewProps> = ({ applicationId }) => {
  const {
    applicationScores,
    applicationScoresByScorer,
    handleSubmit,
    selectedUser,
    isLoggedInUser,
    userData: usersList,
    handleChangeScorer,
    loggedInUser,
    isLoading,
  } = useApplicationScores(applicationId);

  return (
    <>
      {isLoading ? (
        <Spinner className='h-10 w-10' />
      ) : (
        <Formik
          initialValues={applicationScoresByScorer}
          validationSchema={BROADER_REVIEW_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          key={applicationId}
        >
          {({ isValid }) => (
            <Form>
              <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm'>
                <div className='leading-6 p-2 bg-gray-100 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
                  <div className='flex'>
                    <div className='w-1/2 p-2'>Evaluation Board</div>
                    <div className='w-1/2 flex justify-end'>
                      {isLoggedInUser && (
                        <Button
                          variant='primary'
                          customClass='py-2 '
                          type='submit'
                          disabled={!isValid}
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
                      {usersList &&
                        usersList.map((item: any) => {
                          const scoreStatus = applicationScores.filter(
                            (i: any) => item.id == i.user,
                          );
                          return (
                            <UserView
                              key={`BroderReviewUsers_${item.id}`}
                              user={item}
                              scoreStatus={scoreStatus}
                              loggedInUser={loggedInUser}
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
                              disabled={!isLoggedInUser}
                            />
                            <Error name={item.name} />
                          </div>
                        ))}
                      </div>
                      <Textarea
                        name='overallComments'
                        label='Overall comments'
                        disabled={!isLoggedInUser}
                      />
                      <FinalScore />

                      {isLoggedInUser && (
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
          )}
        </Formik>
      )}
    </>
  );
};
