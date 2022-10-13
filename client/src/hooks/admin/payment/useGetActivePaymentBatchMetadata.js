import React, { useState, useEffect } from 'react'
import { AxiosPrivate, cdtToLocalString } from 'utils'
import { useToast, useModal } from 'hooks'
import { useHistory } from 'react-router-dom'
import { Route } from 'constants/routes'
import { Button } from 'components/generic'
import { numberFormat } from 'utils/numberFormat'
import { PaymentBatchStatus } from 'constants/payment/paymentBatchStatus';

export function useGetActivePaymentBatchMetadata() {
	const history = useHistory()
	const { openToast } = useToast()
	const { openModal, closeModal } = useModal()
	const [completedData, setCompletedData] = useState({
		rows: [],
		currentPage: 0,
		totalRows: 0,
	})
	const [tableData, setTableData] = useState({
		rows: [],
		currentPage: 0,
		totalRows: 0,
	})

	const getCompletedData = async () => {
		try {
			const { data } = await AxiosPrivate.get(
				`/api/v2/assessment-portal/payment/complete-payment-batches`
			)

			setCompletedData((prevState) => ({
				...prevState,
				batchId: data.id,
				rows: data?.map((item) => ({
					createdBy: item.createdBy,
					batchName: item.batchName,
					dateCreated:
						item.created &&
            cdtToLocalString(item.created, 'YYYY/MM/DD hh:mm A'),
            fundingAmount: item.totalAmount ? `$${numberFormat(item.totalAmount)}` : '$0',
					totalApplications: item.totalApplications,
					status: PaymentBatchStatus[item.status],
					view: (
						<Button
							text='View'
							variant='outlined'
							size='small'
							onClick={() =>
								history.push(
									`${Route.AdminPortalPaymentBatchDetailsPage}/${item.id}`
								)
							}
						/>
					),
				})),
				totalRows: data.length,
			}))
		} catch (e) {
			openToast({
				status: 'error',
				message: 'Failed to get previous payment batch files',
			})
		}
	}

	const getTableData = async () => {
		try {
			const batchArray = []
			const { data } = await AxiosPrivate.get(
				`/api/v2/assessment-portal/payment/active-payment-batch`
			)

			if(data) {
				batchArray.push(data)
			}

			setTableData((prevState) => ({
				...prevState,
				batchId: data.id,
				rows: batchArray?.map((item) => ({
					createdBy: item.createdBy,
					batchName: item.batchName,
					dateCreated:
						item.created &&
						cdtToLocalString(item.created, 'YYYY/MM/DD hh:mm A'),
					fundingAmount: item.totalAmount ? `$${numberFormat(item.totalAmount)}` : '$0',
					totalApplications: item.totalApplications,
					status: PaymentBatchStatus[item.status],
					view: (
						<Button
							text='View'
							variant='outlined'
							size='small'
							onClick={() =>
								history.push(
									`${Route.AdminPortalPaymentBatchDetailsPage}/${data.id}`
								)
							}
						/>
					),
				})),
				totalRows: batchArray.length,
			}))
		} catch (e) {
			openToast({
				status: 'error',
				message: 'Failed to get active payment batch meta data',
			})
		}
	}
	useEffect(() => {
		getTableData()
		getCompletedData()
	}, [])

	return {
		tableData,
		completedData,
	}
}
