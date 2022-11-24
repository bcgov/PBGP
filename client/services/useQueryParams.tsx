export const useQueryParams = (push: any, query: any, params: any) => {
  return push({ query: params }, undefined, { shallow: true });
};
