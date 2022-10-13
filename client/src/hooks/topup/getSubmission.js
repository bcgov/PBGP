import { useState } from 'react'
import { Route } from 'constants/routes'
import { useHistory } from 'react-router-dom'
import { AxiosPrivate } from 'utils'
import { useToast } from 'hooks/toast'
import { useTranslation } from 'react-i18next'

export const useSubmissionLookup = () => {
  const history = useHistory();
  const { openToast } = useToast();
  const { t } = useTranslation()
  const [isFetching, setFetching] = useState(undefined);
  const [isFetchingSubmissions, setFetchingSubmissions] = useState(undefined);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [commentData, setCommentData] = useState(null)
  return {
    isFetching,
    isFetchingSubmissions,
    error,
    formValues,
    commentData,
    getOne: async (id) => {
      try {
        setFetching(true)
        const { data: submission } = await AxiosPrivate.get(`/api/v1/topup/submission/${id}`)
        setFormValues(submission)
      } catch (e) {
        setError(`Failed to find submission with ID: "${id}"`)
      } finally {
        setFetching(false)
      }
    },
    lookup: async () => {
      try {
        setFetchingSubmissions(true);
        const { data: submissions } = await AxiosPrivate.get(`/api/v1/topup/submission`)
        setFormValues(submissions)
      } catch (e) {
        setError(`Failed to find submissions`)
      } finally {
        setFetchingSubmissions(false);
        setFetching(false);
      }
    },
    edit: async (id, values) => {
      try {
        const { data: submission } = await AxiosPrivate.patch(`/api/v1/topup/organization/${id}`, { ...values, id, submissionType: 'organization' })
				openToast({ status: 'success', message: t('Organization details updated succesfully') })
        history.push(Route.Root)
        openToast({ status: 'warning', message: t('Your submission is now in draft form, please review the application declaration to complete submission') })
      } catch (e) {
        openToast({ status: 'error', message: `Failed to update submission with ID: "${id}"` })
      } finally {
        setFetching(false)
      }
    },
    getComments: async ()=>{
      const response = await AxiosPrivate.get(`/api/v1/topup/action_items`)
      setCommentData(response.data);
    }
  }
}
