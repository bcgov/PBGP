import { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../constants';
import { useHttp } from './useHttp';

export const useApplicationScores = (applicationId: string) => {
  const [applicationScores, setApplicationScores] = useState<any[]>([]);
  const { fetchData } = useHttp();

  useEffect(() => {
    if (applicationId) {
      fetchApplicationScores();
    }
  }, []);

  const fetchApplicationScores = () => {
    fetchData(
      {
        endpoint: API_ENDPOINT.getApplicationScores(applicationId),
      },
      (data: any) => {
        setApplicationScores(data);
      },
    );
  };

  return { applicationScores, setApplicationScores, fetchApplicationScores };
};
