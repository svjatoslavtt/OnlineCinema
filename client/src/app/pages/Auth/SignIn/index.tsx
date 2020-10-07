import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { History } from 'history';

import {inputs} from "./inputs-data";

import {Actions} from "../../../redux/auth/actions";
import Form from "../../../shared/components/Form";
import { LoginInputs } from "../../../shared/interfaces/auth.interface";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<History>();

	const [form, setForm] = useState<LoginInputs>(inputs);

  const handleSubmit = () => {
    const isEmpty = Object.values(form).some((item) => item.value === '');

    if (isEmpty) {
      return dispatch(Actions.loginFailed({ message: 'Все поля должны быть заполнены!' }));
    } 

    return dispatch(
			Actions.loginRequest({
				form: {
					email: form.email.value, 
					password: form.password.value
				}, 
				history
			}));
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