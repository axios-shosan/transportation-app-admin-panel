import { Enterprise, EnterpriseRes } from '@/interfaces/enterprise';
import { ApiSlice } from './apiSlice';

export const extendedApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEnterprise: builder.mutation<Enterprise, Enterprise>({
      query: (data) => ({
        url: `/enterprise/create`,
        method: 'post',
        data,
      }),
    }),
    getEnterprise: builder.mutation<EnterpriseRes, Number>({
      query: (id) => ({
        url: `/enterprise/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateEnterpriseMutation, useGetEnterpriseMutation } =
  extendedApiSlice;
