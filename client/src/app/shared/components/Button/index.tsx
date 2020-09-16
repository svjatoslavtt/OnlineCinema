import React from "react";
import styles from "./style.module.scss";

interface ButtonProps {
  text: string;
  color?: string;
  onClick?: () => void;
}

enum ButtonTextColor {
  WHITE = '#ffffff',
}

const Button: React.FC<ButtonProps> = ({ text, color = ButtonTextColor.WHITE, onClick }) => {
  switch (text) {
    case 'Вход':
      text = 'Войти'
      break;
    case 'Регистрация':
      text = 'Готово'
      break;
  }

  return (
    <div onClick={onClick} className={styles.authBlock} style={{color}}>
      <span>{text}</span>
    </div>
  )
}

export default Button;