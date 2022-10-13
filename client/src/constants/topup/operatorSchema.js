import * as yup from 'yup'

import { Questions } from 'constants/arrays';

const mappedQuestions = Questions.map(item => item.value);

 const validateDateString = (s) => /^\d{4}\/\d{2}\/\d{2}$/.test(s);
 const validateDateStringIfProvided = (s) => s ? validateDateString(s) : true;

export const OperatorInfoSchema = yup.object({
  category: yup.array().of(yup.string()).required(),

  lsl: yup.array().of(yup.object().shape({
    facility_name: yup.string().test('is-valid-facility', 'Please enter a valid facility name', function (val) {
      return (
        this.from[1].value.category.includes('Lsl')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    astrl_number: yup.string().test('is-valid-astrl', 'Please enter a valid 8 digit ASTRL liscence number', function (val) {
      return (
        this.from[1].value.category.includes('Lsl')
          ?
          yup.string()
            .matches(/^[0-9]*$/).min(8).max(8)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    number_lsl_units_recent: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Lsl')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),
    
    licensed: yup.string().test('is-date', "Not a valid date", validateDateStringIfProvided),
    closed: yup.string().test('is-date', "Not a valid date", validateDateStringIfProvided),
    
    })),

    hospice: yup.array().of(yup.object().shape({
      facility_name: yup.string().test('is-valid-facility', 'Please enter a valid facility name', function (val) {
      return (
        this.from[1].value.category.includes('Residential Community Hospice')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    city_or_town: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Residential Community Hospice')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    street_address: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Residential Community Hospice')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    postal_code: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Residential Community Hospice')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    non_AHS_beds: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Residential Community Hospice')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    new_facilties_date: yup.string().test('is-date', "Not a valid date", validateDateStringIfProvided),
    closed_facilties_date: yup.string().test('is-date', "Not a valid date", validateDateStringIfProvided),
  })),

  mental_health: yup.array().of(yup.object().shape({
    facility_name: yup.string().test('is-valid-facility', 'Please enter a valid facility name', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    is_AHS: yup.string().test('is-valid-bool', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .oneOf(mappedQuestions)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    total_beds: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    days_open: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    public_health_beds: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required('This field is required')
            .isValidSync(val)
          :
          true
      )
    }),

    city_or_town: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    street_address: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    postal_code: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Mental Health')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),
  })),

  addictions: yup.array().of(yup.object().shape({
    facility_name: yup.string().test('is-valid-facility', 'Please enter a valid facility name', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    is_AHS: yup.string().test('is-valid-bool', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .oneOf(mappedQuestions)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    total_beds: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    days_open: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    public_health_beds: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    licence_number: yup.string().test('is-valid-number', "Please enter numbers only", function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .isValidSync(val)
          :
          true
      )
    }).test('is-length-8-or-null', 'Licence number must be 8 digits long', val => {
      return val == null || val?.toString()?.length === 8
    }),

    city_or_town: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    street_address: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    postal_code: yup.string().test('is-valid-string', 'This field is required', function (val) {
      return (
        this.from[1].value.category.includes('Addictions')
          ?
          yup.string()
            .required()
            .isValidSync(val)
          :
          true
      )
    }),
  })),

  home_care: yup.object({
    mar_to_jun: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Home Care')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    jul_to_sep: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Home Care')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required() 
            .isValidSync(val)
          :
          true
      )
    }),

    oct_to_dec: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Home Care')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

    jan_to_jan: yup.string().test('is-valid-number', 'Please enter a valid number', function (val) {
      return (
        this.from[1].value.category.includes('Home Care')
          ?
          yup.string()
            .matches(/^[0-9]*$/)
            .required()
            .isValidSync(val)
          :
          true
      )
    }),

  })

})

