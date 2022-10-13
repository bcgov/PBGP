import * as yup from 'yup'


import { OrganizationDeterminationStatuses } from "./organizationLookupFormOptions";

const mappedRequiredNotesStatuses = OrganizationDeterminationStatuses.filter(item=>item.notes).map(item=>item.value);

export const notesRequiredForStatus = status => mappedRequiredNotesStatuses.includes(status);


export const AssessmentPortalDeterminationSchema = yup.object().shape({
  status: yup.string().required('Type is required').oneOf(mappedRequiredNotesStatuses, 'Invalid status'),
  note: yup.string().when(["status"],(status,schema)=>{
      return notesRequiredForStatus(status)?
      schema.required('Notes are required for this field.').max(2048, 'Notes must be 2048 characters or less')
      : schema.max(2048, 'Notes must be 2048 characters or less')
  }),
});