import React from "react";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";

import { getLoading } from "../../../redux/loading/selectors";
import { ButtonTypes } from "../../interfaces/button.types";

enum ButtonTextColor {
  WHITE = '#ffffff',
};

type ButtonPropsTypes = {
  text: string;
  color?: string;
	onClick?: (event?: any) => void;
	type?: string;
};

const Button: React.FC<ButtonPropsTypes> = ({ 
	text, 
	color = ButtonTextColor.WHITE, 
	onClick, 
	type = ButtonTypes.BUTTON
}) => {
  const loading = useSelector(getLoading);
  
  switch (text) {
    case 'Вход':
      text = 'Войти'
      break;
    case 'Регистрация':
      text = 'Готово'
      break;
  }

  return (
		<button 
			disabled={loading} 
			onClick={onClick} 
			type={type as ButtonTypes} 
			className={styles.authBlock} 
			style={{color}}
		>
      <span>{loading ? 'Обработка...' : text}</span>
    </button>
  )
}

export default Button;