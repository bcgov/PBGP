import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  AssignEvaluator,
  Button,
  Link as LinkComponent,
  Comments,
  BroaderReview,
  MenuButton,
  Panel,
  RenderCHFSElement,
  withAuth,
} from '../../components';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApplicationDetails } from '../../services';
import { ApplicationStatus } from '../../constants';
import { WorkshopReview } from '../../components/application/WorkshopReview';
import Link from 'next/link';

const ApplicationDetails: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const {
    topStatusObj,
    schema,
    formData,
    details,
    showComments,
    setShowComments,
    getNextStatusUpdates,
    updateEvaluator,
    userList,
    isPanelDefaultOpen,
    applicationType,
    downloadPDF,
  } = useApplicationDetails(id);

  return (
    <>
      {details && id && typeof id === 'string' && (
        <div className='min-h-screen p-5 w-full bg-white'>
          <div className='w-full mt-2'>
            <LinkComponent href='/applications' variant='link'>
              Applications
            </LinkComponent>{' '}
            &gt;&gt; Confirmation ID: {details.confirmationId}
          </div>
          <h1 className='text-3xl w-full text-bcBluePrimary text-left mb-2 mt-2'>
            {details.projectTitle}
          </h1>
          <div className='flex flex-row mb-4 mt-4'>
            <div className='flex flex-none flex-row  w-3/5 gap-2'>
              <div className='w-fit'>
                <AssignEvaluator
                  users={userList}
                  onChange={updateEvaluator}
                  defaultEvaluator={details.assignedTo}
                />
              </div>
              <div className='w-fit'>
                <Button variant='outline' onClick={() => setShowComments(true)}>
                  <FontAwesomeIcon icon={faComment} className='h-4 mr-2 text-bcBluePrimary' />{' '}
                  Comments
                </Button>
              </div>
            </div>
            <div className='w-2/5 justify-end flex'>
              {details.status === ApplicationStatus.WORKSHOP ? (
                <div className='gap-2 flex'>
                  <Link href={`/applications/${id}/score-table`}>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`w-auto inline-flex justify-center items-center rounded 
  shadow-sm px-4 py-2 text-base font-bold focus:outline-none
  disabled:opacity-50
  focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:text-sm border-transparent bg-bcBluePrimary text-white hover:bg-blue-800 focus:ring-blue-500`}
                    >
                      View Summary Table
                    </a>
                  </Link>
                  <Button variant='primary' onClick={downloadPDF}>
                    Download As PDF
                  </Button>
                </div>
              ) : (
                <MenuButton title='Open' items={getNextStatusUpdates(id, details.status)} />
              )}
            </div>
          </div>

          <div className='grid grid-cols-6 mb-4 mt-4 gap-2'>
            {topStatusObj.map((item: any, index) => {
              return (
                <div
                  key={`statusBox-${index}`}
                  className={`p-2.5 grid grid-rows-2 h-24 ${
                    index == 0 ? ' bg-bcBluePrimary text-white' : ' bg-gray-100'
                  }  items-center text-center justify-center`}
                >
                  <p className='text-sm text-slate-400'>{item.title}</p>
                  <p className='text-lg'>
                    {item.value === 'lastUpdatedBy'
                      ? details[item.value]?.displayName
                      : details[item.value]}
                  </p>
                </div>
              );
            })}
          </div>

          <div className='grid grid-cols-4 gap-4'>
            <div
              className={`${
                [ApplicationStatus.BROADER_REVIEW, ApplicationStatus.WORKSHOP].includes(
                  details.status,
                )
                  ? 'col-span-2'
                  : showComments
                  ? 'col-span-3'
                  : 'col-span-full'
              } `}
            >
              {schema?.length > 0 &&
                formData &&
                schema
                  ?.filter(
                    each =>
                      each.type === 'simplepanel' &&
                      (!each.conditional.show ||
                        (each.conditional.show && formData[each.conditional.when] == true)),
                  )
                  .map((each, i: number) => (
                    <Panel
                      title={each.title}
                      key={each.key}
                      isOpen={isPanelDefaultOpen(i, details.status, each.title)}
                    >
                      <div className='leading-6 p-6 grid lg:grid-cols-2 md:grid-cols-2 gap-4'>
                        {each.components?.map((eachComp: any) => (
                          <RenderCHFSElement
                            component={eachComp}
                            formData={formData}
                            key={eachComp.id}
                          />
                        ))}
                      </div>
                    </Panel>
                  ))}
            </div>
            {showComments && id && typeof id === 'string' && (
              <div className='col-span-1 pb-4'>
                <Comments applicationId={id} onClose={() => setShowComments(false)} />
              </div>
            )}
            {details && applicationType && details.status === ApplicationStatus.BROADER_REVIEW && (
              <div className='col-span-2 pb-4'>
                <BroaderReview
                  applicationId={id}
                  userList={userList}
                  onClose={() => setShowComments(false)}
                  applicationType={applicationType}
                />
              </div>
            )}
            {details && applicationType && details.status === ApplicationStatus.WORKSHOP && (
              <div className='col-span-2 pb-4'>
                <WorkshopReview applicationId={id} applicationType={applicationType} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(withAuth(ApplicationDetails)), {
  ssr: false,
});
