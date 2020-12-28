import React from 'react';

import styles from './style.module.scss';

const Ordering: React.FC = () => {
	return (
		<div className={styles.orderingInformation}>
			<div className={styles.container}>
				<div className={styles.freeDelivery}>
					<i className="fas fa-truck"></i>
					Доставим бесплатно!
				</div>

				<div className={styles.orderingData}>
					<div className={styles.item}>
						<div className={styles.itemTitle}>Товаров в заказе</div>
						<span className={styles.itemNumber}>4</span>
					</div>

					<div className={styles.item}>
						<div className={styles.itemTitle}>Вес заказа</div>
						<span className={styles.itemNumber}>2.410 кг</span>
					</div>

					<div className={styles.item}>
						<div className={styles.itemTitle}>Сумма заказа</div>
						<span className={styles.itemNumber}>3 400 грн.</span>
					</div>

					<div className={styles.item}>
						<div className={styles.itemTitle}>Сумма скидки</div>
						<span className={styles.itemNumber}>-150 грн.</span>
					</div>
				</div>

				<div className={styles.promocode}>
					<input type="text" name="promocode" placeholder="Промокод" />
					<button className={styles.promocodeActiveButton}>Применить</button>
				</div>

				<div className={styles.total}>
					<div className={styles.totalTitle}>
						<span>Итого без учёта доставки:</span>
						<span>3 250 грн.</span>
					</div>

					<button className={styles.checkout}>
						Оформить заказ
					</button>

					<div className={styles.typesOfPayment}>
						Принимаем все
						<span>виды оплаты</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ordering;