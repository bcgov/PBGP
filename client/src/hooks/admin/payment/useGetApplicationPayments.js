import { useState, useEffect } from 'react'
import { AxiosPrivate } from 'utils'
import { useToast, useModal } from 'hooks'
import { useHistory } from 'react-router'
import { numberFormat } from 'utils/numberFormat';

export function useGetApplicationPayments(id) {
  const history = useHistory();
	const { openToast } = useToast()
	const { openModal, closeModal } = useModal()
	const [selections, setSelections] = useState([])
	const [activePaymentBatch, setActivePaymentBatch] = useState(null)
	const [fetchingPaymentApplications, setFetchingPaymentApplications] = useState(undefined)
	const [tableData, setTableData] = useState({
		rows: [],
		currentPage: 0,
		totalRows: 0,
	})

	const refreshTableData = async (
		values = { query: '', filterByBenefit: '' }
	) => {
		const { query, filterByBenefit } = values
		try {
			setFetchingPaymentApplications(true)
			const {
				data: { paymentApplications, isActive },
			} = await AxiosPrivate.get(
				`/api/v2/assessment-portal/payment/form/payment-ready?filter=${filterByBenefit}&query=${query}`
			)
			isActive && setActivePaymentBatch(isActive)
			setTableData((prevState) => ({
				...prevState,
				rows:
					paymentApplications &&
					paymentApplications.map((item) => ({
						formId: item.id,
						organizationName: item.name,
						confirmationNumber: item.confirmationNumber,
						benefitType: item.submissionType,
						fundingAmount: `$${numberFormat(item.totalPaymentAmount)}`,
						paymentStatus: item.paymentStatus
					})),
				totalRows: paymentApplications.length,
			}))
		} catch (e) {
			openToast({ status: 'error', message: 'Failed to get payment data' })
		} finally {
			setFetchingPaymentApplications(false)
		}
	}

	const generateNewPaymentBatch = async () => {
		try {
			let formIds = selections && selections.map((itm) => itm.formId)
			await AxiosPrivate.post(
				'/api/v2/assessment-portal/payment/form/create-payment-batch',
				{ formIds }
			)
			openToast({
				status: 'success',
				message: 'New payment batch created',
			})
			closeModal()
      history.go(0)
		} catch (e) {
			openToast({
				status: 'error',
				message: 'Failed to generate new payment batch',
			})
		}
	}

	const addSelectionsToActiveBatch = async () => {
		try {
			let formIds = selections?.map((itm) => itm.formId)
			await AxiosPrivate.patch(
				`/api/v2/assessment-portal/payment/form/update-payment-batch`,
				{ formIds }
			)
			openToast({
				status: 'success',
				message: 'Forms successfully added to the payment batch',
			})
			closeModal()
      history.go(0)
		} catch (e) {
			openToast({
				status: 'error',
				message:
					'Failed to add forms to the payment batch - please ensure no duplicate forms',
			})
			closeModal()
		}
	}

	const onCancel = () => {
		setSelections([])
		setTableData((prevState) => ({
			...prevState,
			rows: prevState.rows.map(({ tableData, ...rest }) => ({
				...rest,
				tableData: { ...tableData, checked: false },
			})),
		}))
	}

	const onSelectionChange = (selectedRows, selectedRow) => {
		setSelections(selectedRows)
	}

	const onChangePage = async (newPage) => {
		setTableData((prevState) => ({ ...prevState, currentPage: newPage }))
	}

	useEffect(() => {
		refreshTableData()
	}, [])

	return {
		tableData,
		activePaymentBatch,
		selections,
		onSearch: (values) => refreshTableData(values),
		onCancel: () => onCancel(),
		onSelectionChange: (...args) => onSelectionChange(...args),
		onChangePage: (newPage) => onChangePage(newPage),
		onCreateBatch: () =>
			openModal({
				title: 'Confirm Selection',
				description: `Are you sure you want to generate a new payment batch?`,
				disableOnClick: true,
				negativeActionText: 'Cancel',
				positiveActionText: 'Yes, Continue',
				negativeActionOnClick: () => closeModal(),
				positiveActionOnClick: () => generateNewPaymentBatch(),
			}),
		onUpdateBatch: () =>
			openModal({
				title: 'Confirm Selection',
				description: `Are you sure you want to add these selections to the active payment batch?`,
				disableOnClick: true,
				negativeActionText: 'Cancel',
				positiveActionText: 'Yes, Continue',
				negativeActionOnClick: () => closeModal(),
				positiveActionOnClick: () => addSelectionsToActiveBatch(),
			}),
		refreshTableData,
		fetchingPaymentApplications,
	}
}
