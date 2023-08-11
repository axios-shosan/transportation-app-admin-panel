import { useState, useEffect } from 'react';
import React from 'react';
import { PropsWithChildren } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Tooltip } from '@mui/material';
import { Bid } from '@/interfaces/bid';
import { useCreateShipmentMutation } from '@/redux/api/shipmentSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  bidId: number;
  offerId: number;
};

const AcceptBidModal = ({ bidId, offerId }: Props) => {
  const [err, setErr] = useState<string | null>(null);
  const [acceptBid, { isLoading }] = useCreateShipmentMutation();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation(['bids', 'common']);

  const handleAccept = () => {
    acceptBid({
      bid_id: bidId,
      offer_id: offerId,
    })
      .unwrap()
      .then((res) => {
        toast.success("L'offre a été Accepté");
        handleClose();
      })
      .catch((err) => {
        console.error(err);
        toast.error("L'offre n'a pas été accepté !");
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="  w-1/2   ">
      <Tooltip title={t('accept_this_bid')}>
        <button
          onClick={() => {
            handleClickOpen();
          }}
          className="capitalize text-lg text-center w-full  ml-2 h-12 mt-8 bg-primary text-dark rounded-md py-3 font-medium hover:bg-primary hover:bg-opacity-90 shadow-lg lg:h-14"
        >
          {t('accept')}
        </button>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // make a dark background with rounded corners
        PaperProps={{
          style: {
            backgroundColor: '#1F1F1F',
            borderRadius: '10px',
            width: '800px',
            color: 'white',
          },
        }}
      >
        <div className="w-full mx-auto h-auto  py-16 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10  px-4 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   ">
          {/* Title */}
          <h1 className="text-4xl w-full text-center text-primary opacity-80">
            Accepter L'offre
          </h1>
          <p>Vous Voulez Accepter Cette offre?</p>
          <div className={`flex items-center justify-between gap-5`}>
            <button
              className=" bg-light-dark-3  hover:bg-opacity-20 px-4 py-2  rounded-md"
              onClick={() => {
                handleClose();
              }}
            >
              {t('common:cancel')}
            </button>
            <button
              className="  bg-primary text-dark  px-4 py-2  rounded-md"
              onClick={() => {
                handleAccept();
              }}
            >
              {t('common:accept')}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AcceptBidModal;
