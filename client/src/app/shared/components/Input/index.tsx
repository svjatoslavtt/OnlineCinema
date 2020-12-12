import React from "react";

import styles from './style.module.scss';

type InputTypes = {
  type: string;
  name: string;
  placeholder: string;
  empty: boolean | undefined;
  setForm: any;
  form: any;
	required: boolean | undefined;
	icon: React.ReactNode;
}

const Input: React.FC<InputTypes> = ({
  type,
  name,
  placeholder,
  empty,
  required,
  setForm,
	form,
	icon,
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
	
	const classesIput = [styles.input, empty ? styles.noValid : styles.valid];

  return (
    <div className={styles.container}>
			{icon}
      <input
        id={form[name].id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={form.value}
        required={required}
        className={classesIput.join(' ')}
        onChange={handleChange}
      />
      <label htmlFor={form[name].id} className={empty ? styles.noValidLabel : styles.validLabel} />
    </div>
  );
}

export default Input;