import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { classNames } from '../../constants';
import { UserInterface } from '../../contexts';

type AssignEvaluatorProps = {
  users: UserInterface[];
  defaultEvaluator: UserInterface | undefined;
  onChange: (user: UserInterface) => void;
};

export const AssignEvaluator: React.FC<AssignEvaluatorProps> = ({
  users,
  defaultEvaluator,
  onChange,
}) => {
  const [selectedEvaluator, setSelectedEvaluator] = useState<UserInterface | undefined>(
    defaultEvaluator,
  );

  useEffect(() => {
    setSelectedEvaluator(defaultEvaluator);
  }, [defaultEvaluator]);

  return (
    <Listbox
      value={selectedEvaluator}
      onChange={(user: UserInterface) => {
        setSelectedEvaluator(user);
        onChange(user);
      }}
      key={defaultEvaluator?.id}
    >
      {({ open }) => (
        <>
          <Listbox.Button className='relative w-auto cursor-default rounded-md border border-gray-400 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
            <span className='pointer-events-none absolute inset-y-0 left-0 ml-3 flex items-center mr-2'>
              <FontAwesomeIcon icon={faUser} className='h-5 w-5 text-bcBluePrimary' />
            </span>
            <span className='flex items-center pl-3'>
              <span className='pl-4 block'>
                {selectedEvaluator?.displayName ?? 'Assign Evaluator'}
              </span>
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {users?.map(each => (
                <Listbox.Option
                  key={each.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    )
                  }
                  value={each}
                >
                  {({ selected, active }) => (
                    <>
                      <div className='flex items-center'>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate',
                          )}
                        >
                          {each.displayName}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}
                        >
                          <FontAwesomeIcon icon={faCheck} className='h-5 w-5' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};
