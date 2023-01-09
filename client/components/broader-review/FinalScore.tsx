import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

export const FinalScore: React.FC<any> = () => {
  const { values } = useFormikContext<any>();
  const [total, setTotal] = useState<number>();

  function addScores(array: any) {
    let sum = 0;
    array.forEach((item: any) => {
      if (Number.isInteger(item)) {
        sum += Number(item);
      }
    });
    return sum;
  }

  useEffect(() => {
    if (!values) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { finalScore, ...data } = values;
    setTotal(addScores(Object.values(data)));
  }, [values]);

  return (
    <div className='flex'>
      <div className='w-3/4'>
        <span className='text-bcBluePrimary font-bold text-xl'>Final Score</span>
      </div>
      <div className='w-1/4 p-2'>
        <input
          type='number'
          name='finalScore'
          className='w-14 text-center bg-slate-100 BroderReviewInput border border-gray-400 bg-white pl-2 py-2 rounded'
          disabled
          value={total}
        />
      </div>
    </div>
  );
};
