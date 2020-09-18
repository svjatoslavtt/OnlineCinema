import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

import {Actions} from "../../../redux/auth/action";
import Form from "../../../shared/components/Form";
import {RegisterUser} from "../../../shared/interfaces/auth.interface";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialFormData: RegisterUser = {
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
  };

  const [form, setForm] = useState<RegisterUser>(initialFormData);

  const handleSubmit = useCallback(() => {
    dispatch(Actions.registerRequest({ form, history }));
  },[form, dispatch]);

  return (
    <Form form={form} setForm={setForm} handleSubmit={handleSubmit} title='Регистрация' />
  )
}

export default SignUp;