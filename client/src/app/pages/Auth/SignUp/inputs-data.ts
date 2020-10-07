import {InputInterface} from "../../../shared/interfaces/input.interface";

export const inputs: { [key: string]: InputInterface } = {
  email: {
    id: 1,
    type: 'text',
    placeholder: 'Email',
    name: 'email',
    value: '',
    empty: false,
    required: true,
  },
  name: {
    id: 2,
    type: 'text',
    placeholder: 'Name',
    name: 'name',
    value: '',
    empty: false,
    required: true,
  },
  password: {
    id: 3,
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    value: '',
    empty: false,
    required: true,
  },
  confirmPassword: {
    id: 4,
    type: 'password',
    placeholder: 'Confirm password',
    name: 'confirmPassword',
    value: '',
    empty: false,
    required: true,
  },
};
