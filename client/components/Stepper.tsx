interface StepProps {
  index: number;
  step: number;
  label: string;
  isLast: boolean;
  currentStep: number;
}

const Step: React.FC<StepProps> = ({ index, label, isLast, currentStep }) => {
  return (
    <div key={index} className={!isLast ? 'w-full flex items-center' : 'flex items-center'}>
      <div className='relative flex flex-col items-center '>
        <div
          className={`rounded-full border-2 ${
            currentStep > index + 1 && 'bg-bcBluePrimary'
          } border-gray-300 h-8 w-8 flex items-center justify-center py-3  ${
            currentStep >= index + 1 ? 'border-bcBlueNav' : ''
          }`}
        >
          {currentStep == index + 1 && (
            <div
              className={`rounded-full h-6 w-6 flex items-center justify-center bg-bcBluePrimary`}
            ></div>
          )}

          {currentStep > index + 1 && <span className='text-white font-bold text-xl'>✓</span>}
        </div>
        <div
          className={`hidden md:block absolute top-0 text-center mt-10 w-28 text-xs font-medium ${
            currentStep >= index + 1 ? 'font-bold text-bcBluePrimary' : 'text-gray-400'
          }`}
        >
          {label}
        </div>
      </div>
      {!isLast ? (
        <div
          className={`flex-grow  ${
            currentStep <= index + 1 && 'border-dotted'
          }  mx-2 border-t-2 border-bcBlueNav`}
        ></div>
      ) : null}
    </div>
  );
};

export const Stepper: React.FC<{ steps: string[]; currentStep: number }> = ({
  steps,
  currentStep,
}) => {
  const stepCount = steps.length;
  return (
    <div className='container horizontal mt-5 mb-12'>
      <div className='mx-4 p-4 flex justify-between items-center'>
        <p className='sr-only'>
          {currentStep <= stepCount ? `Form step ${currentStep} of ${stepCount}` : 'Form Complete'}
        </p>
        {steps.map((step, index) => (
          <Step
            key={index}
            index={index}
            currentStep={currentStep}
            label={step}
            isLast={stepCount === index + 1}
            step={index + 1}
          />
        ))}
      </div>
    </div>
  );
};
