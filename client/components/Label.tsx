interface LabelProps {
  htmlFor?: string;
}

export const Label = ({ htmlFor, children }: any) => {
  return (
    <label htmlFor={htmlFor} className='block text-bcBlack text-base font-bold'>
      {children}
    </label>
  );
};
