import { Bid, CreateBid } from '@/interfaces/bid';
import { ApiSlice } from './apiSlice';

export const extendedApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBids: builder.mutation<Bid[], null>({
      query: (data) => ({
        url: `/bid/all`,
        method: 'GET',
        data,
      }),
    }),
    getOneBid: builder.mutation<Bid, number>({
      query: (bidId) => ({
        url: `/bid/${bidId}`,
        method: 'GET',
      }),
    }),
    getOffer: builder.mutation<Bid[], number>({
      query: (offerId) => ({
        url: `/offer/${offerId}`,
        method: 'GET',
      }),
    }),
    createBid: builder.mutation<Bid, CreateBid>({
      query: (bid) => ({
        url: `/bid/create`,
        method: 'post',
        data: {
          offer_id: bid.offerId,
          deliver_at: new Date(bid.deliver_at).toISOString(),
          amount: bid.amount,
          note: bid.note,
          status: bid.status,
        },
      }),
    }),
    updateBid: builder.mutation<Bid, Partial<Bid> & { bid_id: number }>({
      query: (data) => ({
        url: `/bid/update`,
        method: 'post',
        data,
      }),
    }),
    deleteBid: builder.mutation<Bid, number>({
      query: (data) => ({
        url: `/bid/delete`,
        method: 'post',
        data: { bid_id: data },
      }),
    }),
  }),
});

export const {
  useCreateBidMutation,
  useUpdateBidMutation,
  useDeleteBidMutation,
  useGetAllBidsMutation,
  useGetOfferMutation,
  useGetOneBidMutation,
} = extendedApiSlice;
