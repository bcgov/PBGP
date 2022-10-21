import { Form, Formik } from 'formik';
import { Button, DropdownField, InputField, YesNoField } from '@components';

export const ContactInfo = () => {
  const dropdownOptions = [
    { value: 'first', text: '1st' },
    { value: 'second', text: '2nd' },
    { value: 'third', text: '3rd' },
    { value: 'fourth', text: '4th' },
  ];
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <div className='w-full outline outline-1 flex flex-col items-center'>
          <h1 className=''>Contact Information</h1>
          <h3 className=''>Please proivde detailed information for your application.</h3>
          <InputField name='facilityName'>Facility Name</InputField>
          <InputField name='applicantName'>Applicant Name</InputField>
          <InputField name='primaryContactName'>Primary Contact Name & Title</InputField>
          <InputField name='contactEmail' type='email'>
            Contact Email
          </InputField>
          <InputField name='phoneNumber' type='tel'>
            Contact Phone Number
          </InputField>

          <div>
            <InputField name='mailingAddress'>Mailing Address</InputField>
            <InputField name='mailingAddressPostalCode'>Postal Code</InputField>
          </div>

          <YesNoField name='isOneApplication'>
            Are you submitting more than one application to BCAAP?
          </YesNoField>

          <DropdownField name='priority' options={dropdownOptions}>
            What is the relative priority of this application to the other(s)?
          </DropdownField>

          {/* <RadioField> */}
          {/* <DropdownField> */}
          <div>
            <Button variant='outline'>Cancel</Button>
            <Button variant='primary'>Next</Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
