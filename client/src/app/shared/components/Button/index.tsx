import React from "react";
import { useSelector } from "react-redux";

import styles from "./style.module.scss";

import { getLoading } from "../../../redux/loading/selectors";

interface ButtonProps {
  text: string;
  color?: string;
  onClick?: () => void;
}

enum ButtonTextColor {
  WHITE = '#ffffff',
}

const Button: React.FC<ButtonProps> = ({ text, color = ButtonTextColor.WHITE, onClick }) => {
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
    <button disabled={loading} onClick={onClick} className={styles.authBlock} style={{color}}>
      <span>{loading ? 'Обработка...' : text}</span>
    </button>
  )
}

export default Button;