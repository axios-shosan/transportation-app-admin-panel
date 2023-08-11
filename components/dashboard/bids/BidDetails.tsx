import * as React from 'react';
import { Divider } from '@mui/material';
import { Bid } from '@/interfaces/bid';
import AcceptBidModal from './AcceptBidModal';
import { useRouter } from 'next/router';
import Title from '../shared-components/Title';
import { parseDate } from '@/utils/utils';
import { useGetEnterpriseMutation } from '@/redux/api/enterpriseSlice';
import { EnterpriseRes } from '@/interfaces/enterprise';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

type Props = {
  bid: Bid;
  offerId: number;
};

const BidDetails = ({ bid, offerId }: Props) => {
  const router = useRouter();
  const [getEnterprise] = useGetEnterpriseMutation();
  const [enterprise, setEnterpirse] = React.useState<EnterpriseRes>();
  const { t } = useTranslation(['bids', 'common']);

  React.useEffect(() => {
    getEnterprise(bid.enterprise_id)
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

      <Title title={t('details_card_title')} />

      {/* From, To and Delivered At */}
      <div className="w-full flex flex-col items-start">
        {/* From */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('amount')}</p>
          <p className="capitalize  opacity-60">{bid.amount}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('deliver_at')}</p>
          <p className="capitalize  opacity-60">{parseDate(bid.deliver_at)}</p>
        </div>
      </div>

      <Divider className="bg-light-dark-4 h-[2px] w-3/4 rounded-lg" />

      {/* Weight, Fragile and Shipment Type */}

      <div className="w-full flex flex-col items-start">
        {/* From */}
        <div className="flex items-center justify-between w-full">
          <p className="capitalize text-base">{t('enterprise')}</p>
          <p className="capitalize  opacity-60">{enterprise?.name}</p>
        </div>
      </div>
      {/* Note */}
      {bid.note && (
        <p className="capitalize text-base font-light text-left w-full">
          <b>{t('note')}</b>
          <br />
          {bid.note}
        </p>
      )}

      {/* Fermer and Accept Bid buttons */}
      <div className="w-full flex items-center justify-center gap-5">
        {/* here */}
        <button
          className="capitalize text-lg text-center w-1/2  mr-2 h-12 mt-8 bg-light-dark-3 text-white rounded-md py-3 font-medium  shadow-lg lg:h-14"
          onClick={() => {
            if (window.history.length > 1) router.back();
            else router.push('/dashboard');
          }}
        >
          {t('cancel', { ns: 'common' })}
        </button>
        <AcceptBidModal bidId={bid.id} offerId={offerId} />
      </div>
    </div>
  );
};

export default BidDetails;
