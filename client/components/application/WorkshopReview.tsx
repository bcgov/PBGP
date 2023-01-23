import { Formik, Form } from 'formik';
import { useWorkshopReview } from '../../services';
import { Button, Spinner } from '../generic';
import {
  EvaluationReviewQuestions,
  APPLICATION_REVIEW_VALIDATION_SCHEMA,
  ReviewCompletionStatus,
  ApplicationType,
} from '../../constants';
import { Textarea, Radio, Error } from '../form';
import { FinalScore, Input } from '../broader-review';

export type WorkshopReviewProps = {
  applicationId: string;
  applicationType: ApplicationType;
};

export const WorkshopReview: React.FC<WorkshopReviewProps> = ({
  applicationId,
  applicationType,
}) => {
  const { applicationScores, handleSubmit, isLoading, loggedInUser } =
    useWorkshopReview(applicationId);

  return (
    <>
      {isLoading ? (
        <Spinner className='h-10 w-10' />
      ) : (
        <Formik
          initialValues={applicationScores}
          validationSchema={APPLICATION_REVIEW_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          key={applicationId}
        >
          {({ isValid }) => (
            <Form>
              <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm'>
                <div className='leading-6 p-2 bg-gray-100 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
                  <div className='flex'>
                    <div className='w-1/2 p-2'>Workshop Evaluation Board</div>
                    <div className='w-1/2 flex justify-end'>
                      {loggedInUser?.isAdmin && (
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
                      <div className='mt-4 bg-white pt-4 pb-4'>
                        {EvaluationReviewQuestions.filter((item: any) => {
                          if (item.criteria) {
                            return item.criteria.includes(applicationType);
                          }
                          return true;
                        }).map((item, index) => (
                          <div key={`WorkshopReviewInput_${index}`} className='mb-3'>
                            <Input
                              obj={item.obj}
                              label={item.label}
                              description={item.description}
                              name={item.name}
                              tooltiptext={item.tooltiptext}
                              disabled={!loggedInUser?.isAdmin}
                            />
                            <Error name={item.name} />
                          </div>
                        ))}
                      </div>
                      <Textarea
                        name='overallComments'
                        label='Overall comments'
                        disabled={!loggedInUser?.isAdmin}
                      />
                      <FinalScore />

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
