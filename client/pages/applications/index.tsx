import { useState } from 'react';
import { withAuth } from '@components';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ApplicationDashboard } from '../../components/form-sections';

const Dashboard: NextPage = () => {
  const [tab, setTab] = useState<number>(1);

  const list = ['Home', 'History Applications'];
  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='w-full pt-2 bg-bcLightBackground'>
        <ul className='flex ml-20 space-x-1'>
          {list.map((item: string, index: number) => (
            <li key={`tab-${index}`}>
              <a
                href='#'
                onClick={() => setTab(index + 1)}
                className={` ${
                  tab === index + 1 ? 'text-gray-800 font-bold border-b-2 border-gray-500' : ''
                } inline-block px-8 py-4 text-gray-400 `}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='px-6 py-4 bg-white'>
        <div className={tab === 1 ? 'block' : 'hidden'}>
          {' '}
          <ApplicationDashboard />
        </div>
        <div className={tab === 2 ? 'block' : 'hidden'}>History Applications</div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Dashboard)), {
  ssr: false,
});
