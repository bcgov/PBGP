import * as yup from 'yup'

export const PaymentXmlHeaderKeys = {

	company_code_currency_value: 'company_code_currency_value',
	document_date: 'document_date',  
	document_number: 'document_number',
	reference: 'reference',
	vendor_account_name_1: 'vendor_account_name_1',
}

export const PaymentXlsValidation = yup.object().shape({
	company_code_currency_value: yup.string().required('The amount is a required field'),
	document_date: yup.string().required('Document Date is a required field'),
	document_number: yup.string().required('Document Number is a required field'),
	reference: yup.string().required('The form reference id is a required field'),
	vendor_account_name_1: yup
		.string()
		.required('The vendor account name is a required field'),
})
