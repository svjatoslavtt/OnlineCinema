import React from "react";

import Form from "../../../shared/components/Form";
import {Input} from "../../../shared/interfaces/input.interface";

const SignIn: React.FC = () => {
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
      type: 'password',
      placeholder: 'Password',
      name: 'password',
      required: true,
    }
  ];

  return (
    <Form inputs={inputs} title="Вход" />
  )
}

export default SignIn;