import React from "react";
import {NavLink} from "react-router-dom";

import styles from "./style.module.scss";

import Button from "../Button";
import Input from "../Input";

import {AuthRoutes} from "../../../routes/routes-const";
import {useSelector} from "react-redux";
import {getAuthStateErrors} from "../../../redux/auth/selectors";

interface FormProps {
  handleSubmit: () => void;
  form: any;
  setForm: any;
  title: string;
}

const Form: React.FC<FormProps> = ({ handleSubmit, setForm, form, title = 'Вход' }) => {
  const errors = useSelector(getAuthStateErrors);

  const login = title === 'Вход';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
        </div>

        {login && (
          <NavLink to={AuthRoutes.SIGN_UP} className={styles.signUp}>
            Регистрация
          </NavLink>
        )}
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            {Object.values(form).map((item: any) => (
              <Input
                key={item.id}
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                required={item.required}
                empty={item.empty}
                form={form}
                setForm={setForm}
              />
            ))}
          </div>
        </div>

        <Button text={login ? 'Войти' : 'Готово'} onClick={handleSubmit} />

        {errors && (<span className={styles.errors}>{errors}</span>)}
      </div>
    </div>
  )
}

export default Form;