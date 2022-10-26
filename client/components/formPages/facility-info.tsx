import { Form, Formik } from 'formik';
import { Button, Field, Radio, Select, Option, CheckboxArray } from '@components';
import { FacilityType, StatusPerTransport } from '../../constants';

export const FacilityInfo: React.FC = () => {

  const dropdownOptions = [
    { value: 'first', text: '1st' },
    { value: 'second', text: '2nd' },
    { value: 'third', text: '3rd' },
    { value: 'fourth', text: '4th' },
  ];



  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({ values }: any) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center drop-shadow-sm'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcDarkBlue'>Facility Information</h1>
              <h3 className=''>Provide detail contact information for your application.</h3>
            </div>

            <div className='flex flex- w-full justify-start'>
                <CheckboxArray title='Facility Type' name='FacilityType' legend='Please select all that apply' options={FacilityType}/>
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                title='Status per transport Canada regulations'
                legend='Select one'
                name='isOneApplication'
                horizontal={true}
                options={StatusPerTransport}
              ></Radio>
            </div>

            

            <div className='flex flex-1 w-full mt-8'>
              <span className='flex flex-1 justify-start'>
                <Button variant='outline'>Cancel</Button>
              </span>
              <span className='flex flex-1 justify-end'>
                <Button  variant='outline'>Back</Button>
                <Button  variant='primary'>Continue</Button>
              </span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
