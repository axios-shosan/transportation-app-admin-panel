import { ButtonProps, InputProps } from '@/interfaces/form';

const inputs: InputProps[] = [
  {
    name: 'name',
    placeholder: 'Nom du Transporteur',
    component: 'text',
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'Email de transporteur: ',
    component: 'text',
    type: 'text',
  },
  {
    name: 'phone_number',
    placeholder: 'Numéro de téléphone',
    component: 'text',
    type: 'text',
  },
];

const buttons: ButtonProps[] = [
  {
    text: 'form.btns.cancel',
    type: 'reset',
  },
  {
    text: 'form.btns.submit',
    type: 'submit',
  },
];

export default {
  inputs,
  buttons,
};
