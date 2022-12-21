import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  AssignEvaluator,
  Button,
  Comments,
  BroaderReview,
  Link,
  MenuButton,
  Panel,
  RenderCHFSElement,
  withAuth,
} from '../../components';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApplicationDetails } from '../../services';

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
  } = useApplicationDetails(id);

  console.log("++++++++++++++++++++ Status", details)
  console.log("++++++++++++++++++++ userList", userList)
  return (
    <>
      {details && id && typeof id === 'string' && (
        <div className='min-h-screen p-5 w-full bg-white'>
          <div className='w-full mt-2'>
            <Link href='/applications' variant='link'>
              Applications
            </Link>{' '}
            &gt;&gt; Confirmation ID: {details.confirmationId}
          </div>
          <h1 className='text-3xl w-full text-bcBluePrimary text-left mb-2 mt-2'>
            {details.projectTitle}
          </h1>
          <div className='flex flex-row mb-4 mt-4'>
            <div className='flex flex-none flex-row  w-4/5 gap-2'>
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
            <div className='w-1/5 grid justify-items-end gap-2'>
              <MenuButton title='Open' items={getNextStatusUpdates(id, details.status)} />
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
            <div className={`${showComments || details.status == 'BROADER_REVIEW' ? 'col-span-2' : 'col-span-full'} `}>
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
            {details && details.status == 'BROADER_REVIEW' && (
              <div className='col-span-2 pb-4'>
                <BroaderReview applicationId={id} users={userList} onClose={() => setShowComments(false)} />
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
