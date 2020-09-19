import React from "react";
import styles from "./style.module.scss";
import {NavLink} from "react-router-dom";

import Button from "../Button";

import {InputInterface} from "../../interfaces/input.interface";

import {AuthRoutes} from "../../../routes/routes-const";
import Input from "../Input";

interface FormProps {
  handleSubmit: () => void;
  form: any;
  setForm: any;
  title: string;
}

const Form: React.FC<FormProps> = ({ handleSubmit, setForm, form, title }) => {
  const login = title === 'Вход';

  console.log(Object.values(form).map((item: any) => item));

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
                value={item.value}
                required={item.required}
                empty={item.empty}
                form={form}
                setForm={setForm}
              />
            ))}
          </div>
        </div>

        <Button text={login ? 'Войти' : 'Готово'} onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default Form;