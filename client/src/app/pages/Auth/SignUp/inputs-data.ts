import {InputInterface} from "../../../shared/types/input.types";

export const inputs: { [key: string]: InputInterface } = {
  email: {
    id: 1,
    type: 'text',
    placeholder: 'Email',
    name: 'email',
    value: '',
    empty: false,
		required: true,
		icon: 'fas fa-envelope',
  },
  name: {
    id: 2,
    type: 'text',
    placeholder: 'Name',
    name: 'name',
    value: '',
    empty: false,
		required: true,
		icon: 'fas fa-signature',
  },
  password: {
    id: 3,
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    value: '',
    empty: false,
		required: true,
		icon: 'fas fa-user-lock',
  },
  confirmPassword: {
    id: 4,
    type: 'password',
    placeholder: 'Confirm password',
    name: 'confirmPassword',
    value: '',
    empty: false,
		required: true,
		icon: 'fas fa-user-lock',
  },
};
