import axios from 'axios';

export const AxiosPublic = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

export const AxiosPrivate = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('keycloakToken')}`,
  },
  baseURL: window._env_.AUTH_PROXY || undefined,
});

AxiosPublic.interceptors.response.use((response) => response.data);
