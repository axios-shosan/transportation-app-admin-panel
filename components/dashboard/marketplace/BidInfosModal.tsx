import Dialog from '@mui/material/Dialog';
import { Divider, Tooltip } from '@mui/material';
import { useState } from 'react';
import Transition from '../shared-components/ModalsTransitions';
import BidOnOffer from './BidModal';
import Title from '../shared-components/Title';

type Props = {
  bidId: number;
};

const BidInfosModal = ({ bidId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Appel d'offre">
        <button
          className="px-4 py-2 bg-primary text-black  rounded-md"
          onClick={handleClickOpen}
        >
          Consulter
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
        <div className="w-full mx-auto h-auto  p-8 min-h-[85vh] flex flex-col gap-5 items-center justify-evenly z-10 bg-light-dark-2 rounded-lg shadow-[0px_0px_5px_2px_rgba(0,0,0,0.25)]   ">
          {/* Title */}
          <Title title="Enchirer" />

          {/* Note */}
          <p className="capitalize text-base font-light">
            <b>Note: </b>
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            blanditiis consequuntur quo non eaque ratione necessitatibus beatae?
            Tempora delectus inventore ratione expedita aliquid tenetur, sed
            enim explicabo, beatae quasi, facere necessitatibus ipsa rerum.
          </p>

          <Divider className="bg-white h-[2px] w-3/4 rounded-lg" />

          {/* From, To and Delivered At */}
          <div className="w-full flex flex-col items-start">
            {/* From */}
            <div className="flex items-center justify-between w-full">
              <p className="capitalize text-base">Départ:</p>
              <p className="capitalize  opacity-60">Alger</p>
            </div>
            {/* TO */}
            <div className="flex items-center justify-between w-full">
              <p className="capitalize text-base">Arrivé:</p>
              <p className="capitalize  opacity-60">Oran</p>
            </div>
            {/* Delivered At */}
            <div className="flex items-center justify-between w-full">
              <p className="capitalize text-base">Date de livraison:</p>
              <p className="capitalize  opacity-60">2022/04/05</p>
            </div>
          </div>

          <Divider className="bg-white h-[2px] w-3/4 rounded-lg" />

          {/* Weight, Fragile and Shipment Type */}
          <div className="w-full flex flex-col items-start">
            {/* Weight */}
            <div className="flex items-center justify-between w-full">
              <p className="capitalize text-base">Poids:</p>
              <p className="capitalize  opacity-60">100kg</p>
            </div>
            {/* Fragile */}
            <div className="flex items-center justify-between w-full">
              <p className="capitalize text-base">Fragile:</p>
              <p className="capitalize  opacity-60">Oui</p>
            </div>
            {/* Shipment Type */}
            <div className="flex items-center justify-between w-full">
              <p className="capitalize text-base">Type de livraison:</p>
              <p className="capitalize  opacity-60">Express</p>
            </div>
          </div>

          {/* Fermer and Enchirer buttons */}
          <div className="w-full flex items-center justify-center gap-5">
            {/* Fermer */}
            <button
              className="px-4 py-2 bg-light-dark-3 text-white  rounded-md"
              onClick={handleClose}
            >
              Fermer
            </button>

            <BidOnOffer offerId={bidId} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BidInfosModal;
