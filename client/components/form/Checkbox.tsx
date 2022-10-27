import { FastField } from 'formik';

interface CheckboxProps {
  name: string | undefined;
  label: string;
  value?: string;
  handleChange?: any;
  styles?: string;
}

export interface CheckboxOptionType {
  label: string;
  value: string;
  name?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ name, label, value, styles = '' }) => {
  /**
   * if being used in an array, unique values will be passed which should be used
   * instead of name, which will be the same for each item in the list
   */

  const identifier = value ?? name;
  return (
    <div className='flex'>
      <FastField
        name={name}
        id={identifier}
        value={value}
        type='checkbox'
        className={`${styles} mr-3 h-5 w-5 min-w-5 mt-px`}
      />
      <label htmlFor={identifier} className={`${styles} cursor-pointer`}>
        {label}
      </label>
    </div>
  );
};

interface CheckboxArrayProps {
  description?: string;
  name: string;
  legend: string;
  options: CheckboxOptionType[];
}

export const CheckboxArray: React.FC<CheckboxArrayProps> = ({ description, name, legend, options }) => {
  return (
    <fieldset className='flex flex-col gap-2'>
      <legend className='text-xl text-bcBlack font-bold w-full'>{legend}</legend>
      <p className='text-gray-400 mb-2 text-sm'>{description}</p>
      {options.map(option => (
        <Checkbox key={option.value} name={option.name} value={option.value} label={option.label} />
      ))}
    </fieldset>
  );
};