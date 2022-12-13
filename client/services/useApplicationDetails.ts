import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { ApplicationStatus, API_ENDPOINT, REQUEST_METHOD, Routes } from '../constants';
import { KeyValuePair } from '../constants/interfaces';
import { UserInterface } from '../contexts';
import { useHttp } from './useHttp';

type ApplicationFormResponseType = {
  versionSchema: { components: KeyValuePair[] };
};

type ApplicationDetailsType = KeyValuePair & {
  projectTitle: string;
  confirmationId: string;
  lastUpdatedBy?: UserInterface;
  assignedTo?: UserInterface;
  status: ApplicationStatus;
  facilityName: string;
  totalEstimatedCost: string;
  asks: string;
  updatedAt: string;
};

export type ApplicationDetailsResponseType = ApplicationDetailsType & {
  form: ApplicationFormResponseType;
  submission: KeyValuePair;
};

export const useApplicationDetails = (id: string | string[] | undefined) => {
  const { replace } = useRouter();

  const { fetchData, sendApiRequest } = useHttp();

  const topStatusObj = [
    { title: 'Status', value: 'status' },
    { title: 'Facility', value: 'facilityName' },
    { title: 'Estimated cost', value: 'totalEstimatedCost' },
    { title: 'Asks', value: 'asks' },
    { title: 'Last updated', value: 'updatedAt' },
    { title: 'Updated by', value: `lastUpdatedBy` },
  ];

  const getApplicationById = (id: string): Promise<ApplicationDetailsResponseType> => {
    return new Promise<ApplicationDetailsResponseType>(resolve => {
      fetchData(
        {
          endpoint: API_ENDPOINT.getApplicationDetails(id),
        },
        (data: ApplicationDetailsResponseType) => {
          resolve(data);
        },
      );
    }).then(data => {
      return data;
    });
  };

  const { data } = useSWR(id, (id: string) => getApplicationById(id));

  const [schema, setSchema] = useState<any[]>([]);
  const [formData, setFormData] = useState<KeyValuePair | undefined>();
  const [details, setDetails] = useState<ApplicationDetailsType | undefined>();
  const [showComments, setShowComments] = useState<boolean>(false);

  const updateStatus = (id: string, status: ApplicationStatus) => {
    sendApiRequest(
      {
        endpoint: API_ENDPOINT.getApplicationStatus(id),
        data: { status },
        method: REQUEST_METHOD.PATCH,
      },
      () => {
        toast.success('Status update successful!!!');
        replace(Routes.HOME);
      },
    );
  };

  const getNextStatusUpdates = (id: string, status: ApplicationStatus) => {
    const statusUpdates = [
      {
        label: 'Discard',
        onClick: () => updateStatus(id, ApplicationStatus.DISCARD),
      },
    ];

    switch (status) {
      case ApplicationStatus.INITIAL_REVIEW:
        statusUpdates.unshift({
          label: 'Proceed to Next Step',
          onClick: () => updateStatus(id, ApplicationStatus.FUNDING_REVIEW),
        });
        break;
      case ApplicationStatus.FUNDING_REVIEW:
        statusUpdates.unshift({
          label: 'Proceed to Next Step',
          onClick: () => updateStatus(id, ApplicationStatus.BROADER_REVIEW),
        });
        break;
      case ApplicationStatus.BROADER_REVIEW:
        statusUpdates.unshift({
          label: 'Proceed to Next Step',
          onClick: () => updateStatus(id, ApplicationStatus.WORKSHOP),
        });
        break;

      case ApplicationStatus.WORKSHOP:
      default:
        break;
    }

    return statusUpdates;
  };

  useEffect(() => {
    if (data) {
      const { form, submission, ...submissionDetails } = data;
      setSchema(form.versionSchema.components);
      setFormData(submission);
      setDetails(submissionDetails);
    }
  }, [data]);

  return {
    topStatusObj,
    schema,
    formData,
    details,
    showComments,
    setShowComments,
    getNextStatusUpdates,
  };
};
