import React, { useState } from 'react';
import { Button } from './Button';

type Option = {
  value: string;
  title: string;
};

interface DropdownProps {
  name?: string;
  options: Option[];
  variant: string;
  required?: boolean;
  tabIndex?: number;
  className?: string;
  type?: string;
  placeHolder?: string;
  labelName?: string;
}

export const Dropdown = ({
  options,
  variant,
  placeHolder,
  type,
  required,
  className,
  tabIndex,
}: DropdownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, isSelected] = useState<String>('');
  return (
    <div className='relative w-full lg:max-w-sm'>
      <Button variant={variant} onClick={() => setIsExpanded(!isExpanded)}>
        {selected ? selected : 'Select'}
      </Button>
      {isExpanded && (
        <div className='bg-white rounded border px-4 py-4 '>
          {options.map((option, index) => (
            <div key={index} onClick={() => isSelected(option.title)}>
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
