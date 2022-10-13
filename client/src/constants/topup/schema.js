import * as yup from 'yup'
import moment from 'moment'
import { dateToString, stringToDate } from 'utils'

import {
  Provinces,
  RegistrationTypes,
  CompanyType,
  FinancialInstitutions,
  AccountType,
  HealthOptions,
  EmployeePosition
} from 'constants/arrays'


const mappedProvinces = Provinces.map(item => item.value)
const mappedRegistrationTypes = RegistrationTypes.map(item => item.value)
const mappedCompanyTypes = CompanyType.map(item => item.value)
const mappedFinancialInstitutions = FinancialInstitutions.map(item => item.value)
const mappedAccountTypes = AccountType.map(item => item.value)
const mappedHealthOptions = HealthOptions.map(item => item.value)
const mappedPositionTypes = EmployeePosition.map(item => item.value)
const datesWithDashed = "/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/"
const datesWIthSlashes = "/^\d{4}\/\d{2}\/\d{2}$/"

const validDateFormats = [
  "YYYYMMDD",
  "YYYY/MM/DD",
  "YYYY.MM.DD",
  "YYYY-MM-DD",
  "YYYY MM DD",
  "YYYY M D",
  "YYYY.M.D",
  "YYYY-M-D",
  "YYYY/M/D",
];

export const parseEmployeeDate = (s) => {
  // Replace backslashes with forward slashes to support dates
  // with backslashes
  s = s?.replace(/\\/g, '/');
  const validDateF = validDateFormats
    .find(df => {
      const dt = moment(s, df, true);

      return dt.isValid()
    })

  return validDateF? moment(s, validDateF, true): null;
}

const validateDateTime = (s) => stringToDate(s).isSameOrBefore(moment())
const isDateTodayOrEarlier = (s) => stringToDate(s).isSameOrBefore(moment())
const isDateWithinFiveDays = (s) => stringToDate(s).isSameOrAfter(moment().subtract(5, 'd'), 'day')
const isDateAfterOneDayAgo = (s) => stringToDate(s).isSameOrAfter(moment().subtract(1, 'd'), 'day')
const isDateBeforeFiveDaysFromNow = (s) => stringToDate(s).isSameOrBefore(moment().add(5, 'd'), 'day')
// const validateDateStringIfProvided = (s) => s ? validateDateString(s) : true
const validatePastDateTime = (s) => stringToDate(s).isBefore(moment(), 'day')
const validateDynamicChecked = (s) => Object.values(s).find(({ checked }) => checked)
const validateLessThanLength = (s, len) => s.toString().length <= len;
const validateGreaterThanLength = (s, len) => s.toString().length >= len;
const validateSin = (s) =>  /^\d{3}(\s?|[-]?)\d{3}(\s?|[-]?)\d{3}$/.test(s);
const validateDateString = s => !!parseEmployeeDate(s);


export const OrganizationInfoSchema = yup.object().shape({
  corp_reg: yup.string().matches(/^[0-9]*$/, "Please include numbers only").required('Corporate Registration Number is required'),
  org_name: yup.string().required(`Your organization's name is required`),
  op_name: yup.string().required(`Your organization's operating name is required`),
  company_type: yup.string().required('A company type is required').oneOf(mappedCompanyTypes, 'Invalid option'),
  website: yup.string(),
  mailing: yup.string().required('Must specify a mailing address'),
  city: yup.string().required('City is a required field'),
  province: yup.string().required('Province/Territory is required').oneOf(mappedProvinces, 'Invalid option'),
  postal: yup.string().required('Postal code is a required field'),
  country: yup.string().required('Please select a country'),
  auth_rep_title: yup.string().required('Representative title is required'),
  auth_rep_name: yup.string().required('Representative name is required'),
  auth_rep_email: yup.string().required('Representative email is required').matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Invalid email address'),
  auth_rep_phone: yup.string().required('Representative phone number is required').max(35, 'Phone number must be less than 35 characters'),
  auth_rep_fax: yup.string(),
  financial_institution: yup.string().required('A financial institution name is required').oneOf(mappedFinancialInstitutions, 'Invalid option'),
  account_holder_name: yup.string().required(`The account holder's name is required`),
  account_type: yup.string().required('An account type is required').oneOf(mappedAccountTypes, 'Invalid option'),
  institution_number: yup.string().test('len', 'The institution number must be 3 digits long', val => val?.length === 3).required('An institution number is required'),
  transit_number: yup.string().test('len', 'A transit number cannot be more than 9 characters long', val => val?.length < 10).required('Your branch transit number is required'),
  account_number: yup.string().test('len', 'An account number cannot be more than 12 characters long', val => val?.length < 13).required('An account number is required'),
  void_cheque: yup.string().required('A photo of a void cheque is required'),
  contact_name: yup.string().required('Contact name is required'),
  contact_phone: yup.string().max(35, 'Phone number must be less than 35 characters').required('Contact Phone is required'),
  contact_email: yup.string().required('Contact email is required').matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Invalid email address'),
  health_setting: yup.string().required('A healthcare institution type is required').oneOf(mappedHealthOptions, 'Invalid option'),
})

export const EmployeeXmlHeaderKeys = {
  sin: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  date_of_birth: '',
  start_date: '',
  position: '',
  paid_hours: '',
}

export const EmployerXlsValidation = yup.object().shape({
  sin: yup.string().test('is-valid-sin', '9 digit SIN number is required', validateSin).required(),
  first_name: yup.string().min(1).max(255).required('First_Name is required'),
  middle_name: yup.string().min(1).max(255),
  last_name: yup.string().min(1).max(255),
  date_of_birth: yup.string().test('is-date', "Not a valid date", validateDateString).required(),
  start_date: yup.string().test('is-date', "Not a valid date", validateDateString).required(),
   paid_hours: yup.string().matches(/^[0-9]+$/g, "Paid_Hours must be only numbers").test('is-less-than-7', "Paid_Hours must be 6 or less digits long", val => val?.length <= 6).required(),
  position: yup.string().required('A valid employee position is required').oneOf(mappedPositionTypes, 'Invalid option'),
})

export const ApplicationDeclarationSchema = yup.object().shape({
  application_declaration: yup.bool().oneOf([true], 'Must acknowledge that you have read and agree with the Appliation Declaration').required('Must acknowledge that you have read and agree with the Appliation Declaration')
})

export const SubmitEmployeesPaidSchema = yup.object().shape({
  employeesPaidDetermination: yup.string().required('Must specify whether all employees have been paid or not'),
  employeesReceivedPayment: yup.number().when('employeesPaidDetermination', {
    is: 'some_paid',
    then: yup.number().required('Must specify the Number of Eligible employees that have received the payment')
  }),
  employeesNotReceivedPayment: yup.number().when('employeesPaidDetermination', {
    is: 'some_paid',
    then: yup.number().required('Must specify the Number of Eligible employees that have not received payment')
  }),
  employeesNotReceivedPaymentReason: yup.string().when('employeesNotReceivedPayment', {
    is: empl => parseInt(empl) > 0,
    then: yup.string().required('Must specify reason for why employees did not receive payment')
  }),
  correctInfo: yup.boolean().required('Must verify that the information is correct'),
})
				