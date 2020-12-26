import React from 'react';

import styles from './style.module.scss';

const Buttons: React.FC = () => {
	return (
		<div className={styles.bookButtons}>
			<button className={styles.addToCart}>В корзину</button>
			<div className={styles.addToFavorite}><i className="far fa-heart" title="Добавить к себе"></i></div>
		</div>
	);
};

export default Buttons;