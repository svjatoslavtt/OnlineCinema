import React from 'react';

import styles from './style.module.scss';
import Ordering from './components/Ordering';

import Banner from '../../shared/components/Banner';
import Footer from '../../shared/components/Footer';
import Header from '../../shared/components/Header';
import Products from '../../shared/components/Products';

const Cart: React.FC = () => {
	return (
		<>
			<Header />
			<Banner title="Корзина" />

			<main className={styles.cart}>
				<div className={styles.products}>
					<div className={styles.header}>
						<span className={styles.title}>Ваши товары</span>
						<div className={styles.deleteProductsButton}>
							<i className="far fa-trash-alt"></i>
							Удалить всё
						</div>
					</div>

					<div className={styles.productsWrapper}>
						<Products 
							data={[]}
							cart={true}
						/>
					</div>
				</div>
				
				<Ordering />
			</main>

			<Footer />
		</>
	);
};

export default Cart;