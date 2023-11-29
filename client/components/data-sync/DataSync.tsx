import { toast } from 'react-toastify';
 import { Formik, Form } from 'formik';

 import { API_ENDPOINT, REQUEST_METHOD, TOKEN_VALIDATION_SCHEMA } from '../../constants';
 import { Button, Spinner } from '../generic';
 import { Field } from '../form';
 import { useAuthContext } from '../../contexts';
 import { useHttp } from '../../services';

 export const DataSyncForm: React.FC<any> = () => {
   const { user } = useAuthContext();
   const { sendApiRequest, isLoading } = useHttp();

   if (!user?.isAdmin) return <></>;

   const syncChefsData = () => {
     sendApiRequest(
       {
         endpoint: API_ENDPOINT.syncChefsData,
         method: REQUEST_METHOD.POST,
       },
       () => {
         toast.success('Application table is updated!');
       },
     );
   };

   const syncChefsAttachments = (values: any) => {
     sendApiRequest(
       {
         endpoint: API_ENDPOINT.syncChefsAttachments,
         method: REQUEST_METHOD.POST,
         data: values,
       },
       () => {
         toast.success('Attachments are updated!');
       },
     );
   };

   return (
     <>
       {isLoading ? (
         <Spinner className='h-10 w-10' />
       ) : (
         <div>
           <div>
             <h4 className='py-2'>Update applications</h4>
             <Button variant='primary' onClick={syncChefsData}>
               Sync CHEFS applications
             </Button>
           </div>

           <div className='pt-12'>
             <h4 className='py-2'>Update attachments</h4>
             <Formik
               initialValues={{
                 token: '',
               }}
               validationSchema={TOKEN_VALIDATION_SCHEMA}
               onSubmit={syncChefsAttachments}
             >
               {({ isValid, values }) => (
                 <Form>
                   <div className='mb-4'>
                     <Field label='' name='token' />
                   </div>

                   <Button type='submit' disabled={!isValid || !values.token} variant='primary'>
                     Sync CHEFS attachments
                   </Button>
                 </Form>
               )}
             </Formik>
           </div>
         </div>
       )}
     </>
   );
 };
 