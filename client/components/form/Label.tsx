interface LabelProps {
  htmlFor: string;
  children?: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className='block text-bcBlack text-lg font-bold'>
      {children}
    </label>
  );
};
