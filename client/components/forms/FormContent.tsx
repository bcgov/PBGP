import {ContactInfo} from '../../pages/contact-info';
interface FormContentProps {
  step: number;
  formTitle: string;
}

export const FormContent: React.FC<FormContentProps> = ({ step, formTitle }) => {
  console.log("+++++++++++++++ formTitle", formTitle)
  console.log("+++++++++++++++ step", step)

  const showStepContent = () => {
    switch (formTitle) {
        case 'Contact Information':
          return <ContactInfo  />;
      //   case 'Care Activities Bundles':
      //     return <CareActivitiesBundle title={formTitle} step={step} />;
      //   case 'Occupation':
      //     return <Occupation title={formTitle} step={step} />;
      //   case 'Activities Gap':
      //     return <ActivitiesGap title={formTitle} step={step} />;
      //   case 'Suggestions':
      //     return <Suggestions title={formTitle} step={step} />;
      default:
        return formTitle;
    }
  };
  return <div className='flex-1 flex flex-col min-h-0 mt-10'>{showStepContent()}</div>;
};
