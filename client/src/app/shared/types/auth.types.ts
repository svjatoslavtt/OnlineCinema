import { History } from 'history';

import { inputs } from "../../pages/Auth/SignIn/inputs-data";

export type Login = {
  email: string;
  password: string;
}

type Book = {
  id: string;
  title: string;
  description: string;
  image: File;
  likes: number;
  owner: string;
}

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  books?: Book[];
}

export type RegisterUser = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export type LoginInputs = typeof inputs;

export type LoginRequest = {
  form: Login;
  history: History;
}

export type RegisterRequest = {
  form: RegisterUser;
  history: History;
}