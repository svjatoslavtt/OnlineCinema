import React from "react";

import Form from "../../../shared/components/Form";
import {Input} from "../../../shared/interfaces/input.interface";

const SignUp: React.FC = () => {
  const inputs: Input[] = [
    {
      id: 1,
      type: 'text',
      placeholder: 'Email',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      placeholder: 'Name',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      placeholder: 'Surname',
    },
    {
      id: 2,
      type: 'password',
      placeholder: 'Password',
      required: true,
    },
    {
      id: 3,
      type: 'password',
      placeholder: 'Confirm password',
      required: true,
    },
  ];

  return (
    <Form inputs={inputs} title="Регистрация" />
  )
}

export default SignUp;