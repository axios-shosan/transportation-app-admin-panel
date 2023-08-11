export type Shipment = {
  id: number;
  deliver_at: Date;
  status: number;
  offer_id?: number;
  bid_id?: number;
  shipper_id?: number;
  from: string;
  to: string;
  shipment_type?: number;
  fragile?: number;
  weight?: number;
};

export const shipmentTypes = ['Standard', 'Fragile'];
export declare type ShipmentType = typeof shipmentTypes[number];
