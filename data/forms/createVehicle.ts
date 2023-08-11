import { ButtonProps, InputProps } from '@/interfaces/form';

const inputs: InputProps[] = [
  {
    name: 'name',
    placeholder: 'form.placeholders.name',
    component: 'text',
    type: 'text',
  },
  {
    name: 'model',
    placeholder: 'form.placeholders.model',
    component: 'text',
    type: 'text',
  },
  {
    name: 'year',
    placeholder: 'form.placeholders.year',
    component: 'text',
    type: 'text',
  },
  {
    name: 'plaque',
    placeholder: 'form.placeholders.plaque',
    component: 'text',
    type: 'text',
  },

  {
    name: 'color',
    placeholder: 'form.placeholders.color',
    component: 'drop-down',
    type: 'text',
    options: [
      {
        value: 'rouge',
        label: 'form.dropdown-labels.colors.red',
      },
      {
        value: 'bleu',
        label: 'form.dropdown-labels.colors.blue',
      },
      {
        value: 'vert',
        label: 'form.dropdown-labels.colors.green',
      },
      {
        value: 'noire',
        label: 'form.dropdown-labels.colors.black',
      },
      {
        value: 'blanche',
        label: 'form.dropdown-labels.colors.white',
      },
      {
        value: 'grise',
        label: 'form.dropdown-labels.colors.grey',
      },
      {
        value: 'jaune',
        label: 'form.dropdown-labels.colors.yellow',
      },
    ],
  },
  {
    name: 'type',
    placeholder: 'form.placeholders.type',
    component: 'drop-down',
    type: 'text',
    options: [
      {
        value: 0,
        label: 'form.dropdown-labels.types.maraicher',
      },
      {
        value: 1,
        label: 'form.dropdown-labels.types.plateau',
      },
      {
        value: 2,
        label: 'form.dropdown-labels.types.frigorifique',
      },
      {
        value: 3,
        label: 'form.dropdown-labels.types.pick-up',
      },
      {
        value: 4,
        label: 'form.dropdown-labels.types.fourgon',
      },
      {
        value: 5,
        label: 'form.dropdown-labels.types.van',
      },
    ],
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
