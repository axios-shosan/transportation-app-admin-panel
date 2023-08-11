import { Transporter } from '@/interfaces/transporter';
import { ApiSlice } from './apiSlice';

export const extendedApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransporters: builder.mutation<Transporter[], null>({
      query: (data) => ({
        url: `/transporter/all`,
        method: 'GET',
        data,
      }),
    }),
    getOneTransoprter: builder.mutation<Transporter, number>({
      query: (data) => ({
        url: `/transporter/${data}`,
        method: 'GET',
      }),
    }),
    createTransporter: builder.mutation<Transporter, Transporter>({
      query: (data) => ({
        url: `/transporter/create`,
        method: 'post',
        data,
      }),
    }),
    updateTransporter: builder.mutation<
      Transporter,
      Partial<Transporter> & { transporter_id: number }
    >({
      query: (data) => ({
        url: `/transporter/update`,
        method: 'post',
        data,
      }),
    }),
    deleteTransporter: builder.mutation<Transporter, number>({
      query: (data) => ({
        url: `/transporter/delete`,
        method: 'post',
        data: { transporter_id: data },
      }),
    }),
  }),
});

export const {
  useCreateTransporterMutation,
  useDeleteTransporterMutation,
  useUpdateTransporterMutation,
  useGetAllTransportersMutation,
  useGetOneTransoprterMutation,
} = extendedApiSlice;
