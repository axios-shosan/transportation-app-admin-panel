export type Offer = {
  id?: number;
  status?: number;
  from: string;
  to: string;
  deliver_at: Date;
  shipment_type: number;
  weight: number;
  fragile: number;
  enabled?: number;
  note: string;
  enterprise_id?: number;
};
