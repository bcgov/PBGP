import { Form, Formik, FormikProps } from 'formik';
import { Field, Radio, Select, Option } from '@components';
import { ContactInfoInterface } from 'constants/interfaces';

const initialValues = {
  facilityName: '',
  applicantName: '',
  primaryContactName: '',
  phoneNumber: '',
  mailingAddress: '',
  mailingAddressPostalCode: '',
  isOneApplication: '',
  priority: '',
};

export const ContactInfo: React.FC = () => {
  const dropdownOptions = [
    { value: 'first', text: '1st' },
    { value: 'second', text: '2nd' },
    { value: 'third', text: '3rd' },
    { value: 'fourth', text: '4th' },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<ContactInfoInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center drop-shadow-sm'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcBluePrimary'>Contact Information</h1>
              <h3>Please proivde detailed information for your application.</h3>
            </div>

            <Field name='facilityName' type='text' label='Facility name' maxLength={300}></Field>
            <Field name='applicantName' type='text' label='Applicant name' maxLength={300}></Field>
            <Field
              name='primaryContactName'
              label='Primary contact name and title'
              maxLength={300}
            ></Field>
            <Field name='contactEmail' type='email' label='Contact email' maxLength={300}></Field>
            <Field
              name='phoneNumber'
              type='tel'
              label='Contact phone number'
              maxLength={20}
            ></Field>

            <div className='flex flex-1 w-full space-x-4'>
              <span className='flex-1'>
                <Field
                  name='mailingAddress'
                  type='text'
                  label='Mailing address'
                  maxLength={300}
                ></Field>
              </span>
              <span className='flex-2'>
                <Field
                  name='mailingAddressPostalCode'
                  type='text'
                  label='Postal code'
                  maxLength={7}
                ></Field>
              </span>
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                legend='Are you submitting more than one application to BCAAP?'
                name='isOneApplication'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              ></Radio>
            </div>

            <Select
              label='What is the relative priority of this application to the other(s)?'
              name='priority'
              disabled={values.isOneApplication === 'yes' ? false : true}
            >
              {dropdownOptions.map((option, index) => (
                <Option
                  label={option.text}
                  value={option.value}
                  selected={index === 0 ? true : false}
                ></Option>
              ))}
            </Select>

            {/* <div className='flex flex-1 w-full mt-8'>
              <span className='flex flex-1 justify-start'>
                <Button variant='outline'>Cancel</Button>
              </span>
              <span className='flex flex-1 justify-end'>
                <Button variant='outline'>Back</Button>
                <Button variant='primary'>Continue</Button>
              </span>
            </div> */}
          </div>
        </Form>
      )}
    </Formik>
  );
};
