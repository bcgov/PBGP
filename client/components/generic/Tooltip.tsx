import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

const tooltipDefaultValues = {
  text: 'Please provide your icon description.',
  icon: faExclamationCircle,
  meaning: 'No meaning has been provided.',
  style: 'text-bcGrayDisabled',
};

export interface TooltipIconProps {
  text?: string;
  icon?: IconDefinition;
  meaning?: string;
  style?: string;
}

export const TooltipIcon = ({
  text = tooltipDefaultValues.text,
  icon = tooltipDefaultValues.icon,
  style = tooltipDefaultValues.style,
}: TooltipIconProps) => {
  return (
    <div className={`inline-block w-[15px]`}>
      <div className='relative flex flex-col font-thin items-center group'>
        <button className='w-[15px]'>
          <FontAwesomeIcon className={`${style}`} icon={icon}></FontAwesomeIcon>
        </button>
        <div
          className={`absolute bottom-3 flex flex-col items-center font-thin  hidden mb-[10px] group-hover:flex`}
        >
          <span className='relative z-10 min-w-[300px] font-thin w-auto p-3 text-sm leading-none text-white bg-bcBluePrimary shadow-sm rounded'>
            {text}
          </span>
          <div className='w-3 h-3 -mt-2 rotate-45 bg-bcBluePrimary'></div>
        </div>
      </div>
    </div>
  );
};
