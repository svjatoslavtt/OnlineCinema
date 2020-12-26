import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

import styles from '../style.module.scss';
import {inputs} from "./inputs-data";

import {Actions} from "../../../redux/auth/actions";
import Form from "../../../shared/components/Form";
import { RegisterUser } from "../../../shared/types/auth.types";

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
      return dispatch(Actions.registerFailed({ message: 'All fields must be filled!' }));
    } else {
      setForm(checkField);

      const formInitialValue: RegisterUser = {
        email: '',
        name: '',
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
		<main className={styles.container}>
			<Form
				form={form}
				setForm={setForm}
				handleSubmit={handleSubmit}
				title='Регистрация'
			/>
		</main>
  )
}

export default SignUp;