import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

import {inputs} from "./inputs-data";

import {Actions} from "../../../redux/auth/action";
import Form from "../../../shared/components/Form";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  type Inputs = typeof inputs;
  const [form, setForm] = useState<Inputs>(inputs);

  const handleSubmit = () => {
    const isEmpty = Object.values(form).some((item) => item.value === '');

    if (isEmpty) {
      dispatch(Actions.loginFailed({ message: 'Все поля должны быть заполнены!' }));
    } else {
      const formData = Object.values(form).reduce((acc, item) => {
        acc = {
          ...acc,
          [item.name]: item.value
        }
        return acc;
      }, {});

      dispatch(Actions.loginRequest({form: formData, history}));
    }
  };

  return (
    <Form
      setForm={setForm}
      form={form}
      handleSubmit={handleSubmit}
      title='Вход'
    />
  )
}

export default SignIn;