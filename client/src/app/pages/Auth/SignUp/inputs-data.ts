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
    type: 'text',
    placeholder: 'Name',
    name: 'name',
    required: true,
  },
  {
    id: 3,
    type: 'text',
    placeholder: 'Surname',
    name: 'surname',
  },
  {
    id: 4,
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    required: true,
  },
  {
    id: 5,
    type: 'password',
    placeholder: 'Confirm password',
    name: 'confirmPassword',
    required: true,
  },
];
