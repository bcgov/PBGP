import { AxiosPrivate } from "utils";
  
export const fetchUser = (authIssuer) => {
    return AxiosPrivate
        .get('/api/v1/auth/validate', {
            headers: {
                AuthIssuer: authIssuer
            }
        })
        .then(({data}) => data);
}