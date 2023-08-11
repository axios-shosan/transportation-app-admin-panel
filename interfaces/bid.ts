export type Bid = {
  id?: number;
  deliver_at: Date;
  amount: number;
  note: string;
  status: number;
  enterprise_id?: number;
};

export type CreateBid = {
  offerId: number;
  deliver_at: Date;
  amount: number;
  note: string;
  status?: number;
};

export type UpdateBid = {
  id?: number;
  bidId: number;
  deliver_at: Date;
  amount: number;
  note: string;
};
