import { REQUEST_METHODS } from './constants';

export interface AxiosOptions {
  method: REQUEST_METHODS;
  headers: {};
  auth: { username: string; password: string };
  url: string;
}
