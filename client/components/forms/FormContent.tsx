import { ContactInfo, GeneralProjectInfo, FormTitles } from '@components';
interface FormContentProps {
  step: number;
  formTitle: string;
}

export const FormContent: React.FC<FormContentProps> = ({ step, formTitle }) => {
  const showStepContent = () => {
    switch (formTitle) {
      case FormTitles.CONTACT_INFO:
        return <ContactInfo />;
      case FormTitles.GENERAL_INFO:
        return <GeneralProjectInfo />;
      default:
        return formTitle;
    }
  };
  return <div className='flex-1 flex flex-col min-h-0 mt-10'>{showStepContent()}</div>;
};
