import {
  ContactInfo,
  GeneralProjectInfo,
  FacilityInfo,
  FundingEligibility,
  EnvironmentalConsiderations,
  SupportDocsChecklist,
  FormSteps,
} from '@components';

interface FormContentProps {
  step: number;
  formTitle: string;
}

export const FormContent: React.FC<FormContentProps> = ({ step, formTitle }) => {
  const showStepContent = () => {
    switch (formTitle) {
      case FormSteps.CONTACT_INFO:
        return <ContactInfo />;
      case FormSteps.GENERAL_INFO:
        return <GeneralProjectInfo />;
      case FormSteps.FACILITY_INFO:
        return <FacilityInfo />;
      case FormSteps.FUNDING_ELIGIBILITY:
        return <FundingEligibility />;
      case FormSteps.ENVIRONMENTAL_CONSIDERATION:
        return <EnvironmentalConsiderations />;
      case FormSteps.SUPPORT_DOCUMENTATION:
        return <SupportDocsChecklist />;
      default:
        return formTitle;
    }
  };
  return <div className='flex-1 flex flex-col min-h-0 mt-10'>{showStepContent()}</div>;
};
