import {ContactInfo} from '../formPages/contact-info';
import {FacilityInfo} from '../formPages/facility-info';
interface FormContentProps {
  step: number;
  formTitle: string;
}

export const FormContent: React.FC<FormContentProps> = ({ step, formTitle }) => {
 
  const showStepContent = () => {
    switch (formTitle) {
        case 'Contact Information':
          return <ContactInfo  />;
        case 'Facility Information':
          return <FacilityInfo  />;
        default:
          return formTitle;
    }
  };
  return <div className='flex-1 flex flex-col min-h-0 mt-10'>{showStepContent()}</div>;
};
