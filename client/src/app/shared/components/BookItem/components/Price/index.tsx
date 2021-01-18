import React from 'react';

import styles from './style.module.scss';

type PriceTypes = {
	price: number;
	discountPrice?: number
	discountPercent?: number;
};

const Price: React.FC<PriceTypes> = ({ price, discountPrice, discountPercent }) => {

	const priceStyles = [
		discountPrice ? styles.priceCrossedOut : styles.price
	];

	return (
		<div className={styles.bookPrice}>
			{discountPrice && (
				<div className={styles.discountPrice}>
					{`${discountPrice} грн.`}
				</div>
			)}

			<div className={styles.priceWrapper}>
				<div className={priceStyles.join(' ')}>
					{`${price} грн.`}
				</div>

				{discountPercent && <div className={styles.badgeSale}>{`-${discountPercent}%`}</div>}
			</div>
		</div>
	);
};

export default Price;