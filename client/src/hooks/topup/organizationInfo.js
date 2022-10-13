import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Route } from 'constants/routes'
import { AxiosPublic, AxiosPrivate, serializeTopupFormValues } from 'utils'
import { useToast } from 'hooks'
import { useTranslation } from 'react-i18next'

export const useOrganizationInfoForm = () => {
	const history = useHistory()
	const [isFetching, setFetching] = useState(false)
  const [isDisabled, setIsDisabled]=useState(false)
	const { openToast } = useToast()
	const { t } = useTranslation()
	return {
		isFetching,
    isDisabled,
		submit: async (values) => {
		try {
				setFetching(true)
				await AxiosPrivate.post('/api/v1/topup/organization', serializeTopupFormValues(values, 'organization'))
				openToast({ status: 'success', message: t('Organization details submitted succesfully') })
        setIsDisabled(true)
				history.push(Route.Root)
			} catch (e) {
				openToast({ status: 'error', message: e.message || t('Failed to submit form') })
        setIsDisabled(false)
			}finally{
        setFetching(false)
      }
		}
	}
}

export const useUpdateTopupForm = () => {
	const [isFetching, setFetching] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const { openToast } = useToast()

	return {
		isFetching,
		isEditing,
		setIsEditing,
		updateForm: async (confirmationNumber, values) => {
	  try {
				setFetching(true)
				const serializedFormValues = serializeTopupFormValues(values)
				await AxiosPrivate.patch(
					`/api/v1/admin/back-office/form/${confirmationNumber}`,
					{
						hasPlaceToStayForQuarantine:
							serializedFormValues.hasPlaceToStayForQuarantine,
						quarantineLocation: serializedFormValues.quarantineLocation,
					}
				)
				openToast({ status: 'success', message: 'Successfully updated form' })
				setIsEditing(false)
				setFetching(false)
			} catch (e) {
				openToast({ status: 'error', message: 'Failed to update form' })
				setFetching(false)
			}
		},
	}
}


