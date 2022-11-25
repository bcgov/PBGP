export const SetQueryParams = (push: any, query: any, params: any): any => {
  return push({ query: params }, undefined, { shallow: true });
};
