import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components';

export type PaginationProps = {
  currentPage: number;
  applicationsPerPage: number;
  totalApplications: number;
  firstPage: () => void;
  lastPage: () => void;
  previousPage: () => void;
  nextPage: () => void;
};

export const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    currentPage,
    applicationsPerPage,
    totalApplications,
    firstPage,
    lastPage,
    previousPage,
    nextPage,
  } = props;
  return (
    <div className='py-2'>
      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>
            {totalApplications != 0
              ? currentPage * applicationsPerPage - applicationsPerPage + 1
              : totalApplications}
          </span>
          -
          <span className='font-medium'>
            {' '}
            {currentPage * applicationsPerPage > totalApplications
              ? totalApplications
              : currentPage * applicationsPerPage}{' '}
          </span>
          of
          <span className='font-medium'> {totalApplications} </span>
        </p>
      </div>
      <nav className='block'></nav>
      {totalApplications != 0 && (
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            <Button onClick={firstPage} variant='outline' disabled={currentPage == 1}>
              <span className='border-l-2 border-gray-900'>
                <FontAwesomeIcon icon={faChevronLeft} className='h-6 text-bcBluePrimary' />
              </span>
            </Button>
            <Button onClick={previousPage} variant='outline' disabled={currentPage == 1}>
              <span>
                <FontAwesomeIcon icon={faChevronLeft} className='h-6 text-bcBluePrimary' />
              </span>
            </Button>

            <Button
              onClick={nextPage}
              variant='outline'
              disabled={currentPage * applicationsPerPage > totalApplications}
            >
              <span>
                <FontAwesomeIcon icon={faChevronRight} className='h-6 text-bcBluePrimary' />
              </span>
            </Button>

            <Button
              onClick={lastPage}
              variant='outline'
              disabled={currentPage * applicationsPerPage > totalApplications}
            >
              <span className='border-r-2 border-gray-900'>
                <FontAwesomeIcon icon={faChevronRight} className='h-6 text-bcBluePrimary' />
              </span>
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
};
