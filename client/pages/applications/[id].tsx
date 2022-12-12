import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button, Comments, Link, Panel, renderCHFSElements, withAuth } from '../../components';
import useSWR from 'swr';
import { useHttp } from '../../services/useHttp';
import { useEffect, useState } from 'react';
import { faUser, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyValuePair } from '../../constants/interfaces';

type ApplicationFormResponseType = {
  versionSchema: { components: KeyValuePair[] };
};

type ApplicationDetailsType = KeyValuePair & {
  projectTitle: string;
  confirmationId: string;
};

export type ApplicationDetailsResponseType = ApplicationDetailsType & {
  form: ApplicationFormResponseType;
  submission: KeyValuePair;
};

const ApplicationDetails: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const { fetchData } = useHttp();

  const topStatusObj = [
    { title: 'Status', value: 'status' },
    { title: 'Facility', value: 'facilityName' },
    { title: 'Estimated cost', value: 'totalEstimatedCost' },
    { title: 'Asks', value: 'asks' },
    { title: 'Last updated', value: 'updatedAt' },
    { title: 'Updated by', value: 'status' },
  ];

  const getApplicationById = (id: string): Promise<ApplicationDetailsResponseType> => {
    return new Promise<ApplicationDetailsResponseType>(resolve => {
      fetchData(
        {
          endpoint: `/applications/${id}`,
        },
        (data: ApplicationDetailsResponseType) => {
          resolve(data);
        },
      );
    }).then(data => {
      return data;
    });
  };

  const { data } = useSWR(id, (id: string) => getApplicationById(id));

  const [schema, setSchema] = useState<any[]>([]);
  const [formData, setFormData] = useState<KeyValuePair | undefined>();
  const [details, setDetails] = useState<ApplicationDetailsType | undefined>();
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const { form, submission, ...submissionDetails } = data;
      setSchema(form.versionSchema.components);
      setFormData(submission);
      setDetails(submissionDetails);
    }
  }, [data]);

  return (
    <>
      {details && (
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
          <div className='flex mb-4 mt-4'>
            <div className='w-1/5 grid grid-cols-2 gap-2'>
              <Button variant='outline'>
                <FontAwesomeIcon icon={faUser} className='h-4 mr-2 text-bcBluePrimary' /> Assign
                Evaluator
              </Button>
              <Button variant='outline' onClick={() => setShowComments(true)}>
                <FontAwesomeIcon icon={faComment} className='h-4 mr-2 text-bcBluePrimary' />{' '}
                Comments
              </Button>
            </div>
            <div className='w-3/5'></div>
            <div className='w-1/5 grid justify-items-end gap-2'>
              <Button variant='primary'>Open</Button>
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
                  <p className='text-lg'>{details[item.value]}</p>
                </div>
              );
            })}
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div className={`${showComments ? 'col-span-2' : 'col-span-full'} `}>
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
                    <Panel title={each.title} key={each.key} isOpen={i === 0}>
                      <div className='leading-6 p-6 grid lg:grid-cols-2 md:grid-cols-2 gap-4'>
                        {each.components?.map((eachComp: any) =>
                          renderCHFSElements(eachComp, formData),
                        )}
                      </div>
                    </Panel>
                  ))}
            </div>
            {showComments && id && typeof id === 'string' && (
              <div className='col-span-1 pb-4'>
                <Comments applicationId={id} onClose={() => setShowComments(false)} />
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
