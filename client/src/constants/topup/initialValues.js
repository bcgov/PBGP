
// Organization related forms

export const organizationInfo = {
  type: '',
  corp_reg: '',
  org_name: '',
  op_name: '',
  company_type: '',
  website: '',
  mailing: '',
  city: '',
  province: 'Alberta',
  postal: '',
  country: 'Canada',
  auth_rep_title: '',
  auth_rep_name: '',
  auth_rep_email: '',
  auth_rep_phone: '',
  auth_rep_fax: '',
  financial_institution: '',
  account_holder_name: '',
  account_type: '',
  institution_number: '',
  transit_number: '',
  account_number: '',
  void_cheque: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  health_setting: ''
}

export const OrganizationsSearchFilter = {
  fromDate: '',
  toDate: '',
  agent: '',
  query: '',
}

// Operator related forms

export const operatorInfo = {
  category: [],
  lsl: [
    {
      facility_name: '',
      astrl_number: '',
      number_lsl_units_recent: '',
      licensed: '',
      closed: '',
    }
  ],
  hospice: [
    {
      facility_name: '',
      num_beds: '',
      non_AHS_beds: '',
      new_facilties_date: '',
      closed_facilties_date: '',
      city_or_town: '',
      street_address: '',
      postal_code: ''
    }
  ],
  mental_health: [
    {
      is_AHS: '',
      total_beds: '',
      days_open: '',
      public_health_beds: '',
      facility_name: '',
      city_or_town: '',
      street_address: '',
      postal_code: ''
    }
  ],
  addictions: [
    {
      is_AHS: '',
      total_beds: '',
      days_open: '',
      public_health_beds: '',
      facility_name: '',
      licence_number: '',
      city_or_town: '',
      street_address: '',
      postal_code: ''
    }
  ],
  home_care: {
    mar_to_jun: '',
    jul_to_sep: '',
    oct_to_dec: '',
    jan_to_jan: '',
  }
}

export const lsl = {
  facility_name: '',
  astrl_number: '',
  number_lsl_units_recent: '',
  licensed: '',
  closed: '',
}
  
export const hospice = {
  facility_name: '',
  num_beds: '',
  non_AHS_beds: '',
  new_facilties_date: '',
  closed_facilties_date: '',
  city_or_town: '',
  street_address: '',
  postal_code: ''
}

export const mental_health = {
  is_AHS: '',
  total_beds: '',
  days_open: '',
  public_health_beds: '',
  facility_name: '',
  city_or_town: '',
  street_address: '',
  postal_code: ''
}

export const addictions = {
  is_AHS: '',
  total_beds: '',
  days_open: '',
  public_health_beds: '',
  facility_name: '',
  licence_number: '',
  city_or_town: '',
  street_address: '',
  postal_code: ''
}

export const home_care = {
  mar_to_jun: '',
  jul_to_sep: '',
  oct_to_dec: '',
  jan_to_jan: ''
}
