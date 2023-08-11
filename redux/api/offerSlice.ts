import { Bid } from '@/interfaces/bid';
import { Offer } from '@/interfaces/offer';
import { ApiSlice } from './apiSlice';

export const extendedApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOffers: builder.mutation<Offer[], null>({
      query: (data) => ({
        url: `/offer/available`,
        method: 'GET',
        data,
      }),
    }),
    getOfferBids: builder.mutation<Bid[], number>({
      query: (offerId) => ({
        url: `/offer/bids/${offerId}`,
        method: 'GET',
      }),
    }),
    getAllSelfOffers: builder.mutation<Offer[], null>({
      query: (data) => ({
        url: `/offer/all`,
        method: 'GET',
        data,
      }),
    }),
    getOneOffer: builder.mutation<Offer, number>({
      query: (data) => ({
        url: `/offer/${data}`,
        method: 'GET',
      }),
    }),
    createOffer: builder.mutation<Offer, Offer>({
      query: (offer) => ({
        url: `/offer/create`,
        method: 'post',
        data: {
          from: offer.from,
          to: offer.to,
          weight: offer.weight,
          fragile: offer.fragile,
          enabled: offer.enabled,
          deliver_at: new Date(offer.deliver_at).toISOString(),
          shipment_type: offer.shipment_type,
          note: offer.note,
        },
      }),
    }),
    updateOffer: builder.mutation<Offer, Partial<Offer>>({
      query: (offer) => ({
        url: `/offer/update`,
        method: 'post',
        data: {
          offer_id: offer.id,
          from: offer.from,
          to: offer.to,
          weight: offer.weight,
          fragile: offer.fragile,
          enabled: offer.enabled,
          deliver_at: new Date(offer.deliver_at),
          shipment_type: offer.shipment_type,
          note: offer.note,
        },
      }),
    }),
    deleteOffer: builder.mutation<Offer, number>({
      query: (data) => ({
        url: `/offer/delete`,
        method: 'post',
        data: { offer_id: data },
      }),
    }),
  }),
});

export const {
  useGetOfferBidsMutation,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
  useGetAllOffersMutation,
  useGetOneOfferMutation,
  useGetAllSelfOffersMutation,
} = extendedApiSlice;
