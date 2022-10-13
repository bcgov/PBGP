import axios from "axios";

export const AxiosPublic = axios.create({
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export const AxiosPrivate = axios.create({
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
  baseURL: window._env_.AUTH_PROXY || undefined
});

AxiosPublic.interceptors.response.use((response) => response.data);
AxiosPrivate.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  config.headers["AuthIssuer"] = config.headers["AuthIssuer"] || `${auth?.user?.authissuer}`;
  
  if(auth?.user?.accessToken) {
    // Provide fallback to access token if present
    config.headers["Authorization"] = `Bearer ${auth.user.accessToken}`;
  }

  return config;
});
