import { ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export interface PanelProps {
  children: ReactNode;
  title: string;
  isOpen?: boolean;
}

export const Panel: React.FC<PanelProps> = ({ children, title, isOpen = false }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  return (
    <div className='open:bg-white border border-2 m-2 open:shadow-lg rounded-sm transform-gpu delay-75 duration-100 ease-in-out'>
      <div
        onClick={() => setOpen(!open)}
        className='leading-6 bg-gray-100 p-4 text-bcBluePrimary dark:text-white font-semibold select-none cursor-pointer'
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
      {open && <div>{children}</div>}
    </div>
  );
};
