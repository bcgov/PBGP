import { useState, useEffect } from 'react';
import { API_ENDPOINT } from '../constants';
import { useHttp } from './useHttp';

export const useApplicationScores = (applicationId: string) => {
  const [applicationScores, setApplicationScores] = useState<any[]>([]);
  const { fetchData, sendApiRequest } = useHttp();

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

  const filterApplicationByScorer = (scorerID: string) => {
    return applicationScores.filter((item: any) => item.user == scorerID);
  };

  return { applicationScores, setApplicationScores, filterApplicationByScorer };
};
