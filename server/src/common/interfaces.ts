import { REQUEST_METHODS } from './constants';

export interface AxiosOptions {
  method: REQUEST_METHODS;
  headers: { 'Content-Type': string };
  auth: { username: string; password: string };
  url: string;
}
