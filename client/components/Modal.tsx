import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useModal } from '../services';
import { Button } from './Button';

export const Modal: React.FC = () => {
  const {
    closeModal,
    state: { isOpen, closeCallback, title, children, positiveActionOnClick, positiveActionText },
  } = useModal();

  const onClose = () => {
    if (closeCallback) {
      closeCallback();
    }
    closeModal();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title as='h2' className='text-xl font-medium leading-6 text-gray-900'>
                        {title}
                      </Dialog.Title>
                      <div className='mt-2'>{children}</div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-8 justify-between'>
                  {positiveActionOnClick && positiveActionText && (
                    <Button variant='primary' onClick={positiveActionOnClick} type='submit'>
                      {positiveActionText}
                    </Button>
                  )}
                  <Button variant='outline' onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
