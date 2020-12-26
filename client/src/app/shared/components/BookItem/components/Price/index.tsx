import React from 'react';

import styles from './style.module.scss';

type PriceTypes = {
	price: number;
	unsalePrice?: number;
	sale?: number;
};

const Price: React.FC<PriceTypes> = ({ unsalePrice, price, sale }) => {
	return (
		<div className={styles.bookPrice}>
			<div className={styles.price}>
				{`${price} грн.`}
			</div>

			{unsalePrice && (
				<div className={styles.unsalePrice}>
					<div className={styles.priceCount}>
						{`${unsalePrice} грн.`}
					</div>

					{sale && <div className={styles.badgeSale}>{`-${sale}%`}</div>}
				</div>
			)}
		</div>
	);
};

export default Price;