import { ButtonProps, InputProps } from '@/interfaces/form';

const inputs: InputProps[] = [
  {
    name: 'deliver_at',
    type: 'datetime-local',
    placeholder: 'form.placeholders.deliver_at',
    component: 'date',
  },
  {
    name: 'amount',
    type: 'text',
    component: 'text',
    placeholder: 'form.placeholders.amount',
  },
  {
    name: 'note',
    placeholder: 'form.placeholders.note',
    component: 'text',
    type: 'text',
  },
];

const buttons: ButtonProps[] = [
  {
    text: 'form.btns.cancel',
    type: 'button',
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
