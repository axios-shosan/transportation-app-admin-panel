import * as React from 'react';
import { Divider } from '@mui/material';
import { Bid } from '@/interfaces/bid';
import { useRouter } from 'next/router';
import Title from '../shared-components/Title';
import { parseDate } from '@/utils/utils';
import { Shipment, shipmentTypes } from '@/interfaces/shipment';
import { useGetEnterpriseMutation } from '@/redux/api/enterpriseSlice';
import { EnterpriseRes } from '@/interfaces/enterprise';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

type Props = {
  shipment: Shipment;
};

const BidDetails = ({ shipment }: Props) => {
  const router = useRouter();
  const [getEnterprise] = useGetEnterpriseMutation();
  const [enterprise, setEnterpirse] = React.useState<EnterpriseRes>();
  const { t } = useTranslation('shipments');

  React.useEffect(() => {
    getEnterprise(shipment.shipper_id)
      .unwrap()
      .then((res) => {
        setEnterpirse(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.data);
      });

    return () => {};
  }, []);

  return (
    <div className="w-[60%] mx-auto h-auto  p-8 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   ">
      {/* Title */}

      <Title title={t('card_title')} />

      {/* From, To and Delivered At */}
      <div className="w-full flex flex-col items-start">
        {/* From */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('from')}</p>
          <p className="capitalize  opacity-60">{shipment.from}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('to')}</p>
          <p className="capitalize  opacity-60">{shipment.to}</p>
        </div>
      </div>

      <Divider className="bg-white h-[2px] w-3/4 rounded-lg" />

      {/* Weight, Fragile and Shipment Type */}
      <div className="w-full flex flex-col items-start">
        {/* Weight */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('deliver_at')}</p>
          <p className="capitalize  opacity-60">
            {parseDate(shipment.deliver_at)}
          </p>
        </div>
      </div>

      <Divider className="bg-white h-[2px] w-3/4 rounded-lg" />
      <div className="w-full flex flex-col items-start">
        {/* Weight */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('weight')}</p>
          <p className="capitalize  opacity-60">{shipment.weight}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('fragile')}</p>
          <p className="capitalize  opacity-60">
            {shipment.fragile ? 'Oui' : 'Non'}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('shipment_type')}</p>
          <p className="capitalize  opacity-60">
            {shipmentTypes[shipment.shipment_type]}
          </p>
        </div>
      </div>

      <Divider className="bg-white h-[2px] w-3/4 rounded-lg" />

      <div className="w-full flex flex-col items-start">
        {/* Weight */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('offer_id')}</p>
          <p className="capitalize  opacity-60">{shipment.offer_id}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('enterprise')}</p>
          <p className="capitalize  opacity-60">{enterprise?.name}</p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-5">
        <button
          className=" bg-light-dark-3  hover:bg-opacity-20 px-4 py-2  rounded-md"
          onClick={() => {
            if (window.history.length > 1) router.back();
            else router.push('/dashboard');
          }}
        >
          {t('retour')}
        </button>
      </div>
    </div>
  );
};

export default BidDetails;
