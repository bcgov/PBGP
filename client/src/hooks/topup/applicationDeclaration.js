import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Route } from 'constants/routes'
import { AxiosPrivate } from 'utils'
import { useToast } from 'hooks/toast'

export const useApplicationDeclarationForm = () => {
  const history = useHistory()
  const [isFetching, setFetching] = useState(false)
  const { openToast } = useToast()
  const { t } = useTranslation()

  return {
    isFetching,
    submit: async () => {
      try {
        setFetching(true);
        await AxiosPrivate.patch('/api/v1/topup/organization/terms/accept')
        openToast({ status: 'success', message: t('Application Declaration successfully submitted.') })
        history.push(Route.Root)
      } catch (e) {
        openToast({ status: 'error', message: e.message || t('Failed to submit form') })
        setFetching(false)
      }
    }
  }
}