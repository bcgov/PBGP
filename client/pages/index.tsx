import { TeamManagement, withAuth } from '@components';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ApplicationDashboard } from '../components/form-sections';
import { useAuthContext } from '../contexts';
import { Tab } from '@headlessui/react';

const Dashboard: NextPage = () => {
  const { user } = useAuthContext();

  const tabList = [
    { title: 'Home', component: <ApplicationDashboard /> },
    { title: 'History Applications', component: <>History Applications</> },
  ];

  if (user?.isAdmin) {
    tabList.push({ title: 'Team Management', component: <TeamManagement /> });
  }

  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='w-full pt-2 bg-bcLightBackground'>
        <Tab.Group>
          <Tab.List className='flex ml-20 space-x-1'>
            {tabList.map(({ title }) => (
              <Tab
                key={title}
                className={({ selected }) =>
                  `inline-block px-8 py-4
                    ${selected && 'text-bcBluePrimary font-bold border-b-4 border-[#003366]'}`
                }
              >
                {title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='px-6 py-4 bg-white'>
            {tabList.map(({ title, component }) => (
              <Tab.Panel key={title}>{component}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(withAuth(Dashboard)), {
  ssr: false,
});
