import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

import {inputs} from "./inputs-data";

import {Actions} from "../../../redux/auth/action";
import Form from "../../../shared/components/Form";
import {RegisterUser} from "../../../shared/interfaces/auth.interface";
import {InputInterface} from "../../../shared/interfaces/input.interface";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const initialFormData: RegisterUser = {
  //   email: '',
  //   name: '',
  //   surname: '',
  //   password: '',
  //   confirmPassword: '',
  // };

  type Inputs = typeof inputs;
  const [form, setForm] = useState<Inputs>(inputs);

  useEffect(() => console.log(form), [form]);

  const handleSubmit = useCallback(() => {
    const checkField = Object.values(form).reduce((acc: Inputs, current) => {
      if (current.value === '') {
        acc[current.name] = {
          ...current,
          empty: true,
        }
        return acc;
      } else {
        acc[current.name] = {
          ...current,
          empty: false,
        }
        return acc;
      }
    }, {});

    const isEmpty = Object.values(checkField).some((item) => item.empty === true);

    if (isEmpty) {
      setForm(checkField);
    } else {
      setForm(checkField);
      const form = Object.values(checkField).reduce((acc, item) => {
        acc = {
          ...acc,
          [item.name]: item.value
        }

        return acc;
      }, {});
      dispatch(Actions.registerRequest({ form, history }));
    }
  },[form, dispatch]);

  return (
    <Form
      form={form}
      setForm={setForm}
      handleSubmit={handleSubmit}
      title='Регистрация'
    />
  )
}

export default SignUp;