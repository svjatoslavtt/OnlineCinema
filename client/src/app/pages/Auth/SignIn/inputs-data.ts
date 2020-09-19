import {InputInterface} from "../../../shared/interfaces/input.interface";

export const inputs = {
  email: {
    id: 1,
    type: 'text',
    placeholder: 'Email',
    name: 'email',
    value: '',
    empty: true,
    required: true,
  },
  password: {
    id: 2,
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    value: '',
    empty: true,
    required: true,
  }
};