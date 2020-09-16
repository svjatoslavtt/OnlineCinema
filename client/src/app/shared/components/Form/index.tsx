import React from "react";
import {NavLink} from "react-router-dom";

import Button from "../Button";

import styles from "./style.module.scss"
import {Input} from "../../interfaces/input.interface";
import {AuthRoutes} from "../../../routes/routes-const";

interface FormProps {
  inputs: Input[];
  title: string;
}

const Form: React.FC<FormProps> = ({ inputs, title }) => {
  const signUp = title === 'Вход';

  const renderInputs =
    Object.values(inputs)
      .map((item: any) => (
        <input
          key={item.id}
          type={item.type}
          placeholder={item.placeholder}
          required={item.required}
        />
      ));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
        </div>

        {signUp && (
          <NavLink to={AuthRoutes.SIGN_UP} className={styles.signUp}>
            Регистрация
          </NavLink>
        )}

      </div>

      <div className={styles.formWrapper}>
        <form method="POST" className={styles.form}>
          <div className={styles.inputWrapper}>
            {renderInputs}
          </div>
          <Button text={title} />
        </form>
      </div>
    </div>
  )
}

export default Form;