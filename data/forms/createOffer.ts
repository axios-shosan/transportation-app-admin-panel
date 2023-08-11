import { ButtonProps, InputProps } from '@/interfaces/form';

const inputs: InputProps[] = [
  {
    name: 'from',
    placeholder: 'form.placeholders.from',
    type: 'text',
    component: 'text',
  },
  {
    name: 'to',
    placeholder: 'form.placeholders.to',
    component: 'text',
    type: 'text',
  },
  {
    placeholder: 'form.placeholders.deliver_at',
    name: 'deliver_at',
    type: 'datetime-local',
    component: 'date',
  },

  {
    name: 'weight',
    placeholder: 'form.placeholders.weight',
    type: 'text',
    component: 'text',
  },

  {
    name: 'shipment_type',
    placeholder: 'form.placeholders.shipment_type',
    component: 'drop-down',
    type: 'text',
    options: [
      {
        value: 0,
        label: 'form.dropdown-labels.shipment_type.standard',
      },
      {
        value: 1,
        label: 'form.dropdown-labels.shipment_type.fragile',
      },
    ],
  },
  {
    name: 'fragile',
    placeholder: 'form.placeholders.fragile',
    component: 'drop-down',
    type: 'text',
    options: [
      {
        value: 0,
        label: 'form.dropdown-labels.fragile.no',
      },
      {
        value: 1,
        label: 'form.dropdown-labels.fragile.yes',
      },
    ],
  },
  {
    name: 'enabled',
    placeholder: 'form.placeholders.enabled',
    component: 'drop-down',
    type: 'text',
    options: [
      {
        value: 0,
        label: 'form.dropdown-labels.enabled.no',
      },
      {
        value: 1,
        label: 'form.dropdown-labels.enabled.yes',
      },
    ],
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
