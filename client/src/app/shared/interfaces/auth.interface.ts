import { History } from 'history';

import { inputs } from "../../pages/Auth/SignIn/inputs-data";

export interface Login {
  email: string;
  password: string;
}

interface Film {
  id: string;
  title: string;
  description: string;
  image: File;
  likes: number;
  owner: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  films?: Film[];
}

export interface RegisterUser {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
}

export type LoginInputs = typeof inputs;

export interface LoginRequest {
  form: Login;
  history: History;
}

export interface RegisterRequest {
  form: RegisterUser;
  history: History;
}