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

type FormTypes = {
  handleSubmit: () => void;
  form: any;
  setForm: any;
  title: string;
};

enum FormParams {
  LOGIN = 'Войти',
  COME_IN = 'Войти',
  DONE = 'Создать',
};

const Form: React.FC<FormTypes> = ({ handleSubmit, setForm, form, title }) => {
	const dispatch = useDispatch();
	const token = useSelector(getAuthToken);
	const errors = useSelector(getAuthErrors);

  const pageParams = {
    isLogin: title === FormParams.LOGIN,
    buttonText: title === FormParams.LOGIN ? FormParams.COME_IN : FormParams.DONE,
  };

	const handlerClearErrors = () => dispatch(Actions.clearErrors());
	
	const handlerLogout = () => dispatch(Actions.logout());

  return (
		<article className={styles.container}>
			<NavLink to='/' className={styles.logo}>
				<section>
					BooksStock
				</section>
			</NavLink>

			<section className={styles.formContainer}>
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
						</div>

						<div className={styles.formFieldsWrapper}>
							<div className={styles.formFields}>
								<div className={styles.inputsWrapper}>
									{Object.values(form).map((item: any) => {
										let icon;

										if (item.icon) {
											icon = (
												<div className={styles.inputIcon}>
													<i className={item.icon} style={{ color: '#264653', fontSize: 14, zIndex: 1 }}></i>
												</div>
											)	
										}
										
										return (
											<Input
												key={item.id}
												type={item.type}
												name={item.name}
												placeholder={item.placeholder}
												required={item.required}
												empty={item.empty}
												form={form}
												setForm={setForm}
												icon={icon}
											/>
										)
									})}
								</div>
							</div>

							<Button text={pageParams.buttonText} onClick={handleSubmit} />

							{pageParams.isLogin && (
								<div className={styles.createAccount} onClick={handlerClearErrors}>
									<NavLink to={AuthRoutes.SIGN_UP} className={styles.signUp}>
										Регистрация
									</NavLink>
									<i className="fas fa-long-arrow-alt-right"></i>
								</div>
							)}

							{!pageParams.isLogin && (
								<div className={styles.createAccount} onClick={handlerClearErrors}>
									<NavLink to={AuthRoutes.SIGN_IN} className={styles.signUp}>
										Войти
									</NavLink>
									<i className="fas fa-long-arrow-alt-right"></i>
								</div>
							)}
						</div>

						{errors && <Error text={errors} />}
					</>
				)}
			</section>
		</article>
  )
}

export default Form;