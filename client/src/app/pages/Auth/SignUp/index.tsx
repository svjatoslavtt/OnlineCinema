import React from "react";

import Form from "../../../shared/components/Form";
import {Input} from "../../../shared/interfaces/input.interface";

const SignUp: React.FC = () => {
  const inputs: Input[] = [
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

  return (
    <Form inputs={inputs} title="Регистрация" />
  )
}

export default SignUp;