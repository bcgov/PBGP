import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useHttp } from '../../services/useHttp';
import { Button } from '../Button';
import { Textarea } from '../form';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { API_ENDPOINT, CommentResponseType, CommentType } from '../../constants';

export type CommentsProps = {
  applicationId: string;
  onClose: () => void;
};

export const Comments: React.FC<CommentsProps> = ({ applicationId, onClose }) => {
  const { fetchData, sendApiRequest } = useHttp();
  const [commentHistory, setCommentHistory] = useState<CommentType[]>([]);

  const fetchCommentHistory = () => {
    fetchData(
      {
        endpoint: API_ENDPOINT.getApplicationComments(applicationId),
      },
      (data: CommentResponseType) => {
        setCommentHistory(data.comments);
      },
    );
  };

  const postComment = (data: any, { setStatus, resetForm }: any) => {
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
        fetchCommentHistory();
      },
    );
  };

  useEffect(() => {
    if (applicationId) {
      fetchCommentHistory();
    }
  }, []);

  return (
    <div
      className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm overflow-y-auto'
      style={{ height: '90%' }}
    >
      <div className='leading-6 bg-gray-100 p-4 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'>
        <div className='flex'>
          <div className='w-1/2'>Comment Section</div>
          <div className='w-1/2 flex justify-end'>
            <FontAwesomeIcon
              icon={faWindowClose}
              className='h-6 text-bcBluePrimary'
              onClick={onClose}
            />
          </div>
        </div>
      </div>
      <div>
        <div className='p-6 grid grid-flow-row gap-4'>
          <div>
            <Formik
              initialValues={{
                comment: '',
              }}
              onSubmit={postComment}
              enableReinitialize={true}
            >
              {() => (
                <Form className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                  <Textarea name='comment' label='Your comments...' />
                  <Button variant='primary' type='submit'>
                    Post comment
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <span className='font-bold text-lg'>History</span>
            {commentHistory?.map((comment: CommentType) => (
              <div className='w-full grid grid-flow-row gap-3 p-3' key={comment.commentId}>
                <div className='grid grid-cols-2'>
                  <span className='text-bcBluePrimary'>By {comment.displayName}</span>
                  <span>{comment.createdAt}</span>
                </div>
                <span>{comment.comment}</span>
                <span className='p-0.5 bg-slate-300'></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
