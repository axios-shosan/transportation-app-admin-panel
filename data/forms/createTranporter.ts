import { ButtonProps, InputProps } from '@/interfaces/form';

const inputs: InputProps[] = [
  {
    name: 'name',
    placeholder: 'form.placeholders.name',
    component: 'text',
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'form.placeholders.email',
    component: 'text',
    type: 'text',
  },
  {
    name: 'phone_number',
    placeholder: 'form.placeholders.phone_number',
    component: 'text',
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'form.placeholders.password',
    component: 'text',
    type: 'password',
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
