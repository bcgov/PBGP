import Link from 'next/link';
import { Routes } from '../constants';
import { useAuthContext } from '../contexts';

type LayoutProps = { children: any; pageName: string };

export const Layout: React.FC<LayoutProps> = ({ pageName, children }) => {
  const { user } = useAuthContext();

  const tabList = [{ title: 'Applications', href: Routes.HOME }];

  if (user?.isAdmin) {
    tabList.push({
      title: 'Team Management',
      href: Routes.TEAM_MANAGEMENT,
    });
  }

  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='w-full pt-2 bg-bcLightBackground'>
        <nav className='flex ml-20 space-x-1' role='tablist'>
          {tabList.map(({ title, href }) => (
            <Link href={href} key={title}>
              <a
                className={`inline-block px-8 py-4 ${
                  pageName === title
                    ? 'text-bcBluePrimary font-bold border-b-4 border-[#003366]'
                    : ''
                }`}
              >
                {title}
              </a>
            </Link>
          ))}
        </nav>
        <div className='px-6 py-4 bg-white'>{children}</div>
      </div>
    </div>
  );
};
