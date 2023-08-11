import { Bid } from '@/interfaces/bid';
import { Offer } from '@/interfaces/offer';
import { Shipment } from '@/interfaces/shipment';
import { Vehicle } from '@/interfaces/vehicle';
import Fuse from 'fuse.js';

const options = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.6,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  fieldNormWeight: 1,
};

export const searchVehicles = (list: Vehicle[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['name', 'model', 'color', 'plaque', 'type', 'year'],
  });

  return fuse.search(pattern).map((item) => item.item);
};

export const searchOffers = (list: Offer[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['from', 'to', 'deliver_at', 'weight', 'shipment_type'],
  });
  return fuse.search(pattern).map((item) => item.item);
};

export const searchShipments = (list: Shipment[], pattern: string) => {
  const fuse = new Fuse(list, {
    ...options,
    keys: ['from', 'to', 'livreur', 'expediteur', 'weight'],
  });
  return fuse.search(pattern).map((item) => item.item);
};

export const searchBids = (list: Bid[], pattern: string) => {
  const fuse = new Fuse(list, { ...options, keys: ['amount', 'deliver_at'] });
  return fuse.search(pattern).map((item) => item.item);
};
