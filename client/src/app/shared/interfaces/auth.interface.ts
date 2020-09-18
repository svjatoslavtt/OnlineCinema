export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  token: string;
}

export interface RegisterUser {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
}