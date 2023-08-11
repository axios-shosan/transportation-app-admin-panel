import * as React from 'react';
import { Divider } from '@mui/material';
import { Offer } from '@/interfaces/offer';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Title from '../shared-components/Title';
import { parseDate } from '@/utils/utils';
import { useGetEnterpriseMutation } from '@/redux/api/enterpriseSlice';
import { toast } from 'react-toastify';
import { EnterpriseRes } from '@/interfaces/enterprise';
import { shipmentTypes } from '@/interfaces/shipment';
import { useTranslation } from 'next-i18next';

type Props = {
  offer: Offer;
};

const BidInfos = ({ offer }: Props) => {
  const router = useRouter();
  const [getEnterprise] = useGetEnterpriseMutation();
  const [enterprise, setEnterpirse] = React.useState<EnterpriseRes>();
  const { t } = useTranslation(['market', 'common']);

  React.useEffect(() => {
    getEnterprise(offer?.enterprise_id)
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

      {/* Note */}
      <p className="w-full text-left capitalize text-base font-light">
        <b>{t('note')}:</b>
        <br />
        {offer?.note}
      </p>

      <Divider className="bg-light-dark-4 h-[2px] w-3/4 mx-auto rounded-lg" />

      {/* From, To and Delivered At */}
      <div className="w-full flex flex-col items-start">
        {/* From */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('from')}</p>
          <p className="capitalize  opacity-60">{offer?.from}</p>
        </div>
        {/* TO */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('to')}</p>
          <p className="capitalize  opacity-60">{offer?.to}</p>
        </div>
        {/* Delivered At */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('deliver_at')}</p>
          <p className="capitalize  opacity-60">
            {parseDate(offer?.deliver_at)}
          </p>
        </div>
      </div>

      <Divider className="bg-light-dark-4 h-[2px] w-3/4 rounded-lg" />

      {/* Weight, Fragile and Shipment Type */}
      <div className="w-full flex flex-col items-start">
        {/* Weight */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('weight')}</p>
          <p className="capitalize  opacity-60">{offer?.weight}kg</p>
        </div>
        {/* Fragile */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('fragile')}</p>
          <p className="capitalize  opacity-60">
            {offer?.fragile ? 'Oui' : 'Non'}
          </p>
        </div>
        {/* Shipment Type */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('shipment_type')}</p>
          <p className="capitalize  opacity-60">
            {shipmentTypes[offer?.shipment_type]}
          </p>
        </div>
      </div>

      <Divider className="bg-light-dark-4 h-[2px] w-3/4 rounded-lg" />

      <div className="w-full flex flex-col items-start">
        {/* Entreprise */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">Entreprise</p>
          <p className="capitalize  opacity-60">{enterprise?.name}</p>
        </div>
      </div>

      {/* Fermer and Enchirer buttons */}
      <div className="w-full flex items-center justify-center gap-5">
        {/* Fermer */}
        {/* Annuler */}
        <button
          type="submit"
          className="capitalize text-lg text-center w-1/2  mr-2 h-12 mt-8 bg-light-dark-3 text-white rounded-md py-3 font-medium  shadow-lg lg:h-14"
          onClick={() => {
            router.back();
          }}
        >
          {t('cancel', { ns: 'common' })}
        </button>

        {/* Sauvegarder */}
        <Link
          // current route + /fill-form
          href={`${router.asPath}/fill-form`}
          className="capitalize text-lg text-center w-1/2  ml-2 h-12 mt-8 bg-primary text-dark rounded-md py-3 font-medium hover:bg-primary hover:bg-opacity-90 shadow-lg lg:h-14"
        >
          {t('bid')}
        </Link>
      </div>
    </div>
  );
};

export default BidInfos;
