import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center py-2'>
      <h1 className='text-6xl font-bold'>
        Welcome to{' '}
        <a className='text-blue-600' href='https://nextjs.org'>
          Next.js!
        </a>
      </h1>
    </div>
  );
};

export default Home;
