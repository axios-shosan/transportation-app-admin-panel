import { ButtonProps, InputProps } from '@/interfaces/form';

const inputs: InputProps[] = [
  {
    name: 'name',
    placeholder: 'from.placeholders.name',
    component: 'text',
    type: 'text',
  },
  {
    name: 'rc',
    placeholder: 'from.placeholders.rc',
    component: 'text',
    type: 'text',
  },
  {
    name: 'nif',
    placeholder: 'from.placeholders.nif',
    component: 'text',
    type: 'text',
  },
  {
    name: 'nis',
    placeholder: 'form.placeholders.nis',
    component: 'text',
    type: 'text',
  },

  {
    name: 'address',
    placeholder: 'form.placeholders.address',
    component: 'text',
    type: 'text',
  },
  {
    name: 'capital',
    placeholder: 'form.placeholders.capital',
    component: 'text',
    type: 'text',
  },
  {
    name: 'type',
    placeholder: 'form.placeholders.type',
    component: 'drop-down',
    type: 'text',
    options: [
      {
        value: 0,
        label: 'form.dropdown-options.types.eurl',
      },
      {
        value: 1,
        label: 'form.dropdown-options.types.snc',
      },
      {
        value: 2,
        label: 'form.dropdown-options.types.sarl',
      },
      {
        value: 3,
        label: 'form.dropdown-options.types.spa',
      },
    ],
  },
  {
    name: 'employees',
    placeholder: 'form.placeholders.emplyees',
    component: 'drop-down',
    type: 'text',
    options: [
      {
        value: 10,
        label: '10<',
      },
      {
        value: 100,
        label: '100<',
      },
    ],
  },
];

const buttons: ButtonProps[] = [
  {
    text: 'Annulé',
    type: 'reset',
  },
  {
    text: 'Créer',
    type: 'submit',
  },
];

export default {
  inputs,
  buttons,
};
