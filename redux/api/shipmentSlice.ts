import { Shipment } from '@/interfaces/shipment';
import { ApiSlice } from './apiSlice';

export const extendedApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShipments: builder.mutation<Shipment[], null>({
      query: (data) => ({
        url: `/shipment/all`,
        method: 'GET',
        data,
      }),
    }),
    getOneShipment: builder.mutation<Shipment, number>({
      query: (data) => ({
        url: `/shipment/${data}`,
        method: 'GET',
      }),
    }),
    createShipment: builder.mutation<Shipment, Partial<Shipment>>({
      query: (shipment) => ({
        url: `/shipment/create`,
        method: 'post',
        data: {
          offer_id: Number(shipment.offer_id),
          bid_id: Number(shipment.bid_id),
        },
      }),
    }),
    updateShipment: builder.mutation<
      Shipment,
      Partial<Shipment> & { shipmentId: number }
    >({
      query: (shipmentId) => ({
        url: `/shipment/update`,
        method: 'post',
        data: {
          shipment_id: shipmentId,
        },
      }),
    }),
    // deleteShipment: builder.mutation<Shipment, number>({
    //   query: (data) => ({
    //     url: `/shiment/delete`,
    //     method: 'post',
    //     data: { shipment_id: data },
    //   }),
    // }),
  }),
});

export const {
  useCreateShipmentMutation,
  // useDeleteShipmentMutation,
  useGetAllShipmentsMutation,
  useGetOneShipmentMutation,
  useUpdateShipmentMutation,
} = extendedApiSlice;
