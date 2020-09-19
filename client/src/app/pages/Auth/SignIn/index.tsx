import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

import {inputs} from "./inputs-data";

import {Login} from "../../../shared/interfaces/auth.interface";
import {Actions} from "../../../redux/auth/action";
import Form from "../../../shared/components/Form";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialFormData: Login = {
    email: '',
    password: '',
  };

  const [form, setForm] = useState(initialFormData);

  const handleSubmit = useCallback(() => {
    dispatch(Actions.loginRequest({form, history}));
  }, [form, dispatch]);

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