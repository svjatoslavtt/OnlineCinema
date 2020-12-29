import React from 'react';

import styles from './style.module.scss';

const Buttons: React.FC = () => {
	return (
		<div className={styles.bookButtons}>
			<button className={styles.addToCart}>В корзину</button>
			<div className={styles.addToFavorite}><i className="fas fa-bookmark" title="Сохранить книгу"></i></div>
		</div>
	);
};

export default Buttons;