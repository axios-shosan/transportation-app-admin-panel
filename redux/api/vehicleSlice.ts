import { Vehicle } from '@/interfaces/vehicle';
import { ApiSlice } from './apiSlice';

export const extendedApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.mutation<Vehicle[], null>({
      query: (data) => ({
        url: `/vehicle/all`,
        method: 'GET',
        data,
      }),
    }),
    getOneVehicle: builder.mutation<Vehicle, number>({
      query: (data) => ({
        url: `/vehicle/${data}`,
        method: 'GET',
      }),
    }),
    createVehicle: builder.mutation<Vehicle, Vehicle>({
      query: (data) => ({
        url: `/vehicle/create`,
        method: 'POST',
        data,
      }),
    }),
    updateVehicle: builder.mutation<
      Vehicle,
      Partial<Vehicle> & { vehicle_id: number }
    >({
      query: (data) => ({
        url: `/vehicle/update`,
        method: 'POST',
        data,
      }),
    }),
    deleteVehicle: builder.mutation<Vehicle, number>({
      query: (data) => ({
        url: `/vehicle/delete`,
        method: 'POST',
        data: { vehicle_id: data },
      }),
    }),
  }),
});

export const {
  useGetAllVehiclesMutation,
  useGetOneVehicleMutation,
  useCreateVehicleMutation,
  useDeleteVehicleMutation,
  useUpdateVehicleMutation,
} = extendedApiSlice;
