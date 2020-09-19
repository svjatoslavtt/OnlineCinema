import React from "react";

import styles from './style.module.scss';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  empty: boolean | undefined;
  setForm: any;
  form: any;
  required: boolean | undefined;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  empty,
  required,
  setForm,
  form,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: {
        ...form[event.target.name],
        value: event.target.value
      }
    });
  }

  return (
    <>
      <input
        id={form[name].id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={form.value}
        required={required}
        className={empty ? styles.noValid : styles.valid}
        onChange={handleChange}
      />
      <label htmlFor={form[name].id} className={empty ? styles.noValidLabel : styles.validLabel} />
    </>
  );
}

export default Input;