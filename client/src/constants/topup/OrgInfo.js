import { Provinces, CompanyType, FinancialInstitutions, AccountType, HealthOptions } from 'constants/arrays'

export const OrgInfo = {
  title: 'Organization Details',
  inputs: [
    { name: 'company_type', label: 'Company Type', type: 'select', options: CompanyType, required: true },
    { name: 'corp_reg', label: 'Corporate Access/Registration Number', type: 'number', required: true },
    { name: 'org_name', label: 'Organization - Legal Entity Name (Employer Name)', required: true },
    { name: 'op_name', label: 'Operating Name', required: true },
    { name: 'website', label: 'Business Website', required: false },
    { name: 'health_setting', label: "Health Setting Type", type: 'select', options: HealthOptions, required: true}
  ]
}

export const MailingInfo = {
  title: 'Address',
  inputs: [
    { name: 'mailing', label: 'Primary Mailing Address', required: true },
    { name: 'city', label: 'City', required: true },
    { name: 'province', label: 'Province', type: 'select', options: Provinces, required: true },
    { name: 'postal', label: 'Postal Code', required: true },
    { name: 'country', label: 'Country', required: true },
  ]
}
export const Rep = {
  title: 'Representative (person authorized to sign financial agreement)',
  inputs: [
    { name: 'auth_rep_title', label: 'Job Title of Authorized Representative', required: true },
    { name: 'auth_rep_name', label: 'Name of Authorized Representative', required: true },
    { name: 'auth_rep_email', label: 'Authorized Representative Email', required: true },
    { name: 'auth_rep_phone', label: 'Authorized Representative Phone', type: 'number', required: true },
    { name: 'auth_rep_fax', label: 'Authorized Representative Fax', type: 'number', required: false },
  ]
}
export const BankingInfo = {
  title: 'Deposit Information',
  inputs: [
    { name: 'financial_institution', label: 'Name of Financial Institution', type: 'select', options: FinancialInstitutions, required: true },
    { name: 'account_holder_name', label: 'Account Holder Name', required: true },
    { name: 'account_type', label: 'Account Type', type: 'select', options: AccountType, required: true },
    { name: 'institution_number', label: 'Institution Number', required: true },
    { name: 'transit_number', label: 'Branch or Transit Number', required: true },
    { name: 'account_number', label: 'Account Number', required: true },
    { name: 'void_cheque', label: 'Void Cheque Upload', type: 'file', required: true },
  ]
}

export const Contact = {
  title: 'Contact (person to contact regarding submissions)',
  inputs: [
    { name: 'contact_name', label: 'Contact Name', required: true },
    { name: 'contact_email', label: 'Contact Email', required: true },
    { name: 'contact_phone', label: 'Contact Phone Number', required: true },
  ]
}

