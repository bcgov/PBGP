import { Button } from '@components';
import React from 'react';

export default () => {
  return (
    <div className='h-full grid grid-cols-2 gap-20'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-4xl'>BC Air Access Program Application</h2>
        <p>
          The BC Air Access Program (BCAAP) is an application-based program that provides capital
          cost-sharing contributions to aviation infrastructure projects. This includes facility
          master plans, greenhouse gas audits or baselining, and GPS approaches. Support to the
          aviation sector is critical to helping BC address its responsibilities concerning medevac,
          wildfire suppression, emergency response, access to remote (often Indigenous) communities,
          clean transportation, tourism, and economic development.
        </p>
      </div>
      <div className='flex items-center'>
        <Button variant='primary'>Login</Button>
      </div>
    </div>
  );
};
