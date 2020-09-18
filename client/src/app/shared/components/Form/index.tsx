import React from "react";
import styles from "./style.module.scss";
import {NavLink} from "react-router-dom";
import {AuthRoutes} from "../../../routes/routes-const";
import Button from "../Button";

interface FormProps {
  handleSubmit: () => void;
  form: any;
  setForm: any;
  title: string;
}

const Form: React.FC<FormProps> = ({ handleSubmit, setForm, form, title }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

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
            {login ? (
              <>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="password"
                  value={form.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Name"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="surname"
                  value={form.surname}
                  placeholder="Surname"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  placeholder="Confirm password"
                  onChange={handleChange}
                />
              </>
            )}
          </div>
        </div>

        <Button text={login ? 'Войти' : 'Готово'} onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default Form;