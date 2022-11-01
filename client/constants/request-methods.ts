import axios from 'axios';
import { APIUrl } from './constants';
import { AxiosPublicInterface } from './interfaces';

export enum REQUEST_METHOD {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const API_ENDPOINT = {
  applicationId: (applicationId: string) => `/applications/${applicationId}`,
  APPLICATIONS: '/applications',
  IN_PROGRESS: '/applications/in-progress',
};

export const AxiosPublic = ({ method, endpoint, token, data }: AxiosPublicInterface) => {
  return axios({
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data,
    url: `${APIUrl}${endpoint}`,
  });
};
