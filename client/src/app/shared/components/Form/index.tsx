import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from "./style.module.scss";

import Button from "../Button";
import Input from "../Input";

import {AuthRoutes} from "../../../routes/routes-const";
import {getAuthErrors, getAuthToken} from "../../../redux/auth/selectors";
import { Actions } from "../../../redux/auth/actions";
import Error from "../Error";

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
	const token = useSelector(getAuthToken);

  const pageParams = {
    isLogin: title === FormParams.LOGIN,
    buttonText: title === FormParams.LOGIN ? FormParams.COME_IN : FormParams.DONE,
  };

  const errors = useSelector(getAuthErrors);

	const handlerClearErrors = () => dispatch(Actions.clearErrors());
	
	const handlerLogout = () => dispatch(Actions.logout());

  return (
    <div className={styles.formContainer}>
			{token ? (
				<div className={styles.formWarning}>
					Вы авторизованы. Для того что-бы продолжить необходимо выйти. Вы хотите выйти?
					<span className={styles.voiteYes} onClick={handlerLogout}>Да</span>
				</div>
			) : (
				<>
					<div className={styles.formHeader}>
						<div className={styles.formTitle}>
							{title}
						</div>

						{pageParams.isLogin && (
							<NavLink to={AuthRoutes.SIGN_UP} className={styles.signUp} onClick={handlerClearErrors}>
								Регистрация
							</NavLink>
						)}
					</div>

					<div className={styles.formFieldsWrapper}>
						<div className={styles.formFields}>
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

						{errors && <Error text={errors} />}
					</div>
				</>
			)}
    </div>
  )
}

export default Form;