export const LookupAssessmentTableColumns = [
  { title: 'Organization', field: 'name' },
  { title: 'Confirmation Number', field: 'confirmationNumber' },
  { title: 'Last Updated', field: 'lastUpdated'  },
  { title: 'Submission Date', field: 'submissionDate'},
  { title: 'Assigned to', field: 'owner' },
  { title: 'Organization Status', field: 'organizationStatus' },
  { title: 'Operator Benefit', field: 'operatorBenefitStatus' },
  { title: 'Employee Benefit', field: 'employeeBenefitStatus' },
  { title: 'Operator Payment Status', field: 'operatorPaymentStatus'} ,
  { title: 'Employee Payment Status', field: 'employeePaymentStatus' },
  { title: '', field: 'viewOrg'},
]

export const FilesTableColumns = [
  { title: 'Name', field: 'fileName' },
  { title: 'Date Created', field: 'dateUploaded' },
  { title: 'Uploader Name', field: 'name' },
  { title: 'Type', field: 'fileType' },
  { title: '', field: 'download' },
]

export const PaymentTableColumns = [
  { title: 'Organization Name', field: 'organizationName' },
  { title: 'Confirmation #', field: 'confirmationNumber' },
  { title: 'Benefit Type', field: 'benefitType' },
  { title: 'Funding Amount', field: 'fundingAmount' },
  { title: 'Payment Status', field: 'paymentStatus' },
]

export const PaymentBatchFileColumns = [
  { title: 'Name', field: 'fileName' },
  { title: 'Date Created', field: 'dateCreated' },
  { title: 'Type', field: 'fileType' },
  { title: 'Total Number of Applications', field: 'totalApplications' },
  { title: 'Total Funding Amount', field: 'totalFundingAmount' },
  { title: '', field: 'download'}
]

export const UploadPaymentFilesColumns = [
  {title: "Created", field: "created"}, {title: "File", field: "file"}, {title: "Agent Name", field: "agentName"}, { title: '', field: 'download'}
]						