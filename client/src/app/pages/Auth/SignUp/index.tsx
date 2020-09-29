import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

import {inputs} from "./inputs-data";

import {Actions} from "../../../redux/auth/actions";
import Form from "../../../shared/components/Form";
import { RegisterUser } from "../../../shared/interfaces/auth.interface";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  type RegisterInputs = typeof inputs;
  const [form, setForm] = useState<RegisterInputs>(inputs);

  const handleSubmit = () => {
    const checkField = Object.values(form).reduce((acc: RegisterInputs, current) => {
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
      return dispatch(Actions.registerFailed({ message: 'Все поля должны быть заполнены!' }));
    } else {
      setForm(checkField);

      const formInitialValue: RegisterUser = {
        email: '',
        name: '',
        surname: '',
        password: '',
        confirmPassword: '',
      }

      const form = Object.values(checkField).reduce((acc, item) => {
        acc = {
          ...acc,
          [item.name]: item.value
        }
        return acc;
      }, formInitialValue);

      return dispatch(Actions.registerRequest({ form, history }));
    }
  };

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