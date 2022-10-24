export interface PageTitleProps {
    title: string;
    description: string;
    children?: any;
  }
  
  export const PageTitle: React.FC<PageTitleProps> = ({ title, description, children }) => {
    return (
      <>
        <div className='flex text-bcBluePrimary items-center space-x-2 p-2'>
          {children}
          <h1 className='text-xl text-bcBluePrimary text-center w-full flex-col items-start'>asd {title}</h1>
        </div>
        <p className='text-sm text-center text-gray-400 p-2'>{description}</p>
      </>
    );
  };
  