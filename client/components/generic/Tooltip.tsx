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
      <div className='relative flex flex-col  items-center group'>
        <div className='w-[15px]'>
          <FontAwesomeIcon className={`${style}`} icon={icon}></FontAwesomeIcon>
        </div>
        <div
          className={`absolute bottom-3 flex flex-col items-center hidden mb-[10px] group-hover:flex`}
        >
          <span className='relative z-10 min-w-[300px] w-auto p-3 text-xs leading-none text-white bg-bcBluePrimary shadow-sm rounded'>
            {text}
          </span>
          <div className='w-3 h-3 -mt-2 rotate-45 bg-bcBluePrimary'></div>
        </div>
      </div>
    </div>
  );
};
