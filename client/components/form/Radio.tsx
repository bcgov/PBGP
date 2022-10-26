import classnames from 'classnames';
import { Error } from '@components';
import { Field as FormikField, useField, useFormikContext } from 'formik';

interface RadioProps {
  title?: string;
  legend: string;
  name: string;
  options: RadioOptionType[];
  horizontal?: boolean;
}

export interface RadioOptionType {
  label: string;
  value: string;
}

export interface RadioType extends React.FC<RadioProps> {
  Boolean: React.FC<BooleanRadioProps>;
}

export const Radio: RadioType = ({ title, legend, name, options, horizontal }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-bcBlack font-bold w-full'>{title}</h3>
      <legend className='text-gray-400 mb-4'>{legend}</legend>
      <div
        className={classnames(
          'flex',
          { 'flex-col gap-4': !horizontal },
          { 'flex-row gap-8': horizontal }
        )}
      >
        {options.map((option, index) => (
          <label
            key={option.label + index}
            className='flex items-center cursor-pointer leading-none'
          >
            <FormikField
              type='radio'
              name={name}
              value={option.value}
              className='mr-2 h-5 w-5 min-w-5 cursor-pointer'
            />
            {option.label}
          </label>
        ))}
      </div>
      <Error name={name} />
    </div>
  );
};

export interface BooleanRadioProps {
  name: string;
  legend: string;
  trueLabel?: string;
  falseLabel?: string;
  horizontal?: boolean;
}

const BooleanRadio: React.FC<BooleanRadioProps> = ({
  name,
  legend,
  trueLabel,
  falseLabel,
  horizontal,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'true') {
      setFieldValue(name, true);
    }
    if (event.target.value === 'false') {
      setFieldValue(name, false);
    }
  };

  return (
    <fieldset className='flex flex-col gap-4'>
      <legend className='text-bcBlack font-bold mb-4 text-gray-400'>{legend}</legend>
      <div
        className={classnames(
          'flex',
          { 'flex-col gap-4': !horizontal },
          { 'flex-row gap-8': horizontal }
        )}
      >
        <label className='flex items-center cursor-pointer leading-none'>
          <FormikField
            {...field}
            type='radio'
            value={true}
            onChange={handleChange}
            className='mr-2 h-5 w-5 cursor-pointer'
          />
          {trueLabel || 'Yes'}
        </label>
        <label className='flex items-center cursor-pointer leading-none'>
          <FormikField
            {...field}
            type='radio'
            value={false}
            onChange={handleChange}
            className='mr-2 h-5 w-5 cursor-pointer'
          />
          {falseLabel || 'No'}
        </label>
      </div>
      <Error name={name} />
    </fieldset>
  );
};

Radio.Boolean = BooleanRadio;
