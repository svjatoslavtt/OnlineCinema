import {InputInterface} from "../../../shared/interfaces/input.interface";

export const inputs: InputInterface[] = [
  {
    id: 1,
    type: 'text',
    placeholder: 'Email',
    name: 'email',
    required: true,
  },
  {
    id: 2,
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    required: true,
  }
];