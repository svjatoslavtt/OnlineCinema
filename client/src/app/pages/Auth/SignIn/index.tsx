import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { History } from 'history';

import styles from '../style.module.scss';
import {inputs} from "./inputs-data";

import {Actions} from "../../../redux/auth/actions";
import Form from "../../../shared/components/Form";
import { LoginInputs } from "../../../shared/types/auth.types";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory<History>();

	const [form, setForm] = useState<LoginInputs>(inputs);

  const handleSubmit = () => {
    const isEmpty = Object.values(form).some((item) => item.value === '');

    if (isEmpty) {
      return dispatch(Actions.loginFailed({ message: 'All fields must be filled!' }));
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
		<main className={styles.container}>
			<Form
				setForm={setForm}
				form={form}
				handleSubmit={handleSubmit}
				title='Войти'
			/>
		</main>
  )
}

export default SignIn;