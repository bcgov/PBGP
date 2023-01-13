import React from 'react';
import { Checkbox, Textarea } from '@components';

interface CheckboxProps {
  name: string;
  label: string;
  value?: string;
  textvalue?: string;
  styles?: string;
}

export const CheckBoxExplain: React.FC<CheckboxProps> = ({ name, label, value, textvalue }) => {
  return (
    <>
      <div className='flex flex- w-full justify-start my-2'>
        <Checkbox name={name} value={value} label={label} />
      </div>
      {value && (
        <div className='flex flex-col w-full p-4 bg-slate-200'>
          <Textarea
            name={`${name}Explanation`}
            value={textvalue}
            label=''
            description='Please explain:'
            maxLength={225}
          />
        </div>
      )}
    </>
  );
};
