import { ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export interface PanelsProps {
  children: ReactNode;
  title: String;
}

export const Panels: React.FC<PanelsProps> = ({ children, title }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className='open:bg-white border border-2 border-slate-300  mt-4 open:shadow-lg rounded-sm transform-gpu delay-75 duration-100 ease-in-out'>
      <div
        onClick={() => setOpen(!open)}
        className='leading-6  bg-slate-200 p-4 text-slate-900 dark:text-white font-semibold select-none'
      >
        <div className='flex'>
          <div className='w-1/2'>{title}</div>
          <div className='w-1/2 flex justify-end'>
            {open ? (
              <FontAwesomeIcon icon={faChevronUp} className='h-4 text-bcBluePrimary' />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} className='h-4 text-bcBluePrimary' />
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className='mt-3 text-sm leading-6 p-6 text-slate-600 dark:text-slate-400'>
          {children}
        </div>
      )}
    </div>
  );
};
