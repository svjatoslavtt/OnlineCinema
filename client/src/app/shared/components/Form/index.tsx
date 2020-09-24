import React, { useState } from "react";
import {NavLink} from "react-router-dom";

import styles from "./style.module.scss";

import Button from "../Button";
import Input from "../Input";

import {AuthRoutes} from "../../../routes/routes-const";
import {useDispatch, useSelector} from "react-redux";
import {getAuthErrors} from "../../../redux/auth/selectors";
import { Actions } from "../../../redux/auth/action";

interface FormProps {
  handleSubmit: () => void;
  form: any;
  setForm: any;
  title: string;
};

enum FormParams {
  LOGIN = 'Вход',
  COME_IN = 'Войти',
  DONE = 'Готово',
};

const Form: React.FC<FormProps> = ({ handleSubmit, setForm, form, title = FormParams.LOGIN }) => {
  const dispatch = useDispatch();

  const pageParams = {
    isLogin: title === FormParams.LOGIN,
    buttonText: title === FormParams.LOGIN ? FormParams.COME_IN : FormParams.DONE,
  };

  const errors = useSelector(getAuthErrors);

  const handlerClearErrors = () => dispatch(Actions.clearErrors());

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
        </div>

        {pageParams.isLogin && (
          <NavLink to={AuthRoutes.SIGN_UP} className={styles.signUp} onClick={handlerClearErrors}>
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

        <Button text={pageParams.buttonText} onClick={handleSubmit} />

        {errors && (<span className={styles.errors}>{errors}</span>)}
      </div>
    </div>
  )
}

export default Form;