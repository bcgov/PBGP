import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useHttp } from '../../services/useHttp';
import { SetQueryParams } from '../../services/useQueryParams';
import { Endpoints } from '../../constants';


export default function ApplicationDetails() {
    const [details, setDetails] = useState([]);
    const { fetchData } = useHttp();
    const { push, query } = useRouter();
    const { id, limit } = query;

    const setApplicationDetails = async () => {
        const params = { ...query, page: 1, limit: 1, facilityName: '', confirmationId: id };
        fetchData(
          {
            endpoint: Endpoints.APPLICATIONS,
            params,
          },
          ({ result, total }: any) => {
            setDetails(p => ({ ...p, data: result }));
          },
        );
      };

      useEffect(() => {
        (async () => {
          if (!id) return;
          setApplicationDetails();
        })();
      }, []);

    return <div>
        <h1>{id}</h1>
        {JSON.stringify(details, null, 4)}
        </div>
}

