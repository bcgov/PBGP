import { REQUEST_METHODS } from './constants';

export interface AxiosOptions {
  method: REQUEST_METHODS;
  headers: any;
  url: string;
}
