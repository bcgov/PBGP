import { Form, Formik, FormikProps } from 'formik';
import { Radio, CheckboxArray, Textarea } from '@components';
import { FacilityType, FacilityUsage, StatusPerTransport } from '../../constants';
import { FacilityInfoInterface } from 'constants/interfaces';

const initialValues = {
  facilityType: '',
  status: '',
  eligibleForACAP: '',
  madeForACAP: '',
  facilityUsage: '',
  passengerVolumes: '',
  cargoTonnes: '',
  aircraftMovements: '',
};

export const FacilityInfo: React.FC = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }: FormikProps<FacilityInfoInterface>) => (
        <Form className='flex justify-center'>
          <div className='w-2/4 p-4 gap-y-6 bg-white flex flex-col items-center drop-shadow-sm'>
            <div className='mb-4 flex items-center flex-col'>
              <h1 className='text-xl font-medium text-bcDarkBlue'>Facility Information</h1>
              <h3 className=''>Provide detail contact information for your application.</h3>
            </div>

            <div className='flex flex- w-full justify-start'>
              <CheckboxArray
                legend='Facility Type'
                name='facilityType'
                description='Please select all that apply'
                options={FacilityType}
              />
            </div>

            <div className='flex flex-1 w-full justify-start'>
              <Radio
                title='Status per transport Canada regulations'
                legend='Select one'
                name='status'
                horizontal={true}
                options={StatusPerTransport}
              ></Radio>
            </div>

            <div className='flex flex-col w-full px-8 py-4 bg-slate-200'>
              <Radio
                legend='Is the project eligible for the federal Airports Capital Assistance Program (ACAP)?'
                name='eligibleForACAP'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              />

              <Radio
                legend='If “Yes”, has an application been made to ACAP?'
                name='madeForACAP'
                horizontal={true}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              />

              <Textarea
                name='textAreaNoAppAcap'
                label=''
                description='If selected “No”, please indicate why not'
                maxLength={225}
              />
            </div>

            <div className='flex flex- w-full justify-start'>
              <CheckboxArray
                legend='Facility Usage'
                name='facilityUsage'
                description='Select all that apply'
                options={FacilityUsage}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
