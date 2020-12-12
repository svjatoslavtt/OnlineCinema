import React from "react";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";

import { getLoading } from "../../../redux/loading/selectors";
import { ButtonTypesEnum } from "../../interfaces/button.types";

enum ButtonTextColor {
  WHITE = '#ffffff',
};

type ButtonTypes = {
  text: string;
  color?: string;
	onClick?: (event?: any) => void;
	type?: string;
};

const Button: React.FC<ButtonTypes> = ({ 
	text, 
	color = ButtonTextColor.WHITE, 
	onClick, 
	type = ButtonTypesEnum.BUTTON
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
			type={type as ButtonTypesEnum} 
			className={styles.button} 
			style={{color}}
		>
      <span>{loading ? 'Loading...' : text}</span>
    </button>
  )
}

export default Button;