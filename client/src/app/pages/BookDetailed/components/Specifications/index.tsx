import React, { useState } from 'react';
import { Maestro } from './icons/Maestro';

import { MasterCard } from './icons/Mastercard';
import { Visa } from './icons/Visa';
import styles from './style.module.scss';

enum TabIndex {
	FIRST = '1',
	SECOND = '2',
	THIRD = '3',
};

const Specifications: React.FC = () => {
	const [activeTabIndex, setActiveTabIndex] = useState<TabIndex>(TabIndex.FIRST);

	return (
		<section className={styles.tabs}>
			<div className={styles.tabsNavigation}>
				<div className={styles.tabsTitle} data-tab-active={activeTabIndex === TabIndex.FIRST} onClick={setActiveTabIndex.bind(null, TabIndex.FIRST)}>Характеристики</div>
				<div className={styles.tabsTitle} data-tab-active={activeTabIndex === TabIndex.SECOND} onClick={setActiveTabIndex.bind(null, TabIndex.SECOND)}>Оплата</div>
				<div className={styles.tabsTitle} data-tab-active={activeTabIndex === TabIndex.THIRD} onClick={setActiveTabIndex.bind(null, TabIndex.THIRD)}>Доставка</div>
			</div>

			<div className={styles.tabsContentWrapper}>
				{activeTabIndex === TabIndex.FIRST && (
					<div className={styles.tabContent}>
						<div className={styles.tabContentColumn}>
							<div className={styles.specificationItem}>
								<span className={styles.title}>Автор:</span>
								<span className={styles.textLink}>Кинг Стивен</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Жанр:</span>
								<span className={styles.textLink}>Триллеры</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Серия:</span>
								<span className={styles.textLink}>Тёмная башня</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Издательства:</span>
								<span className={styles.textLink}>Издательство АСТ</span>
							</div>

							<div className={styles.specificationItemIsbn}>
								<span className={styles.isbn}>ISBN:</span>
								<span className={styles.text}>978-5-17-120968-1</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Артикул:</span>
								<span className={styles.text}>p5567526</span>
							</div>
						</div>

						<div className={styles.tabContentColumn}>
							<div className={styles.specificationItem}>
								<span className={styles.title}>Возрастное ограничение:</span>
								<span className={styles.text}>16+</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Год издания:</span>
								<span className={styles.text}>2020</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Количество страниц:</span>
								<span className={styles.text}>608</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Переплет:</span>
								<span className={styles.text}>Твердый (7БЦ)</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Формат</span>
								<span className={styles.text}>130x206 мм</span>
							</div>

							<div className={styles.specificationItem}>
								<span className={styles.title}>Вес:</span>
								<span className={styles.text}>0.52 кг</span>
							</div>
						</div>
					</div>
				)}

				{activeTabIndex === TabIndex.SECOND && (
					<div className={styles.tabPayment}>
						<span className={styles.tabTitle}>Способы оплаты</span>

						<div className={styles.paymentItem}>
							<span className={styles.title}>При получении</span>
							<span className={styles.text}>Оплата производится в момент получения заказа. Наличными или картой.</span>
						</div>

						<div className={styles.paymentItem}>
							<span className={styles.title}>Наложенный платеж</span>
							<span className={styles.text}>Доставка УКРПошта, Новая почта</span>
						</div>

						<div className={styles.paymentItem}>
							<span className={styles.title}>Банковской картой на сайте</span>
							<span className={styles.text}>Visa, MasterCard, Maestro</span>
						</div>

						<div className={styles.paymentItem}>
							<span className={styles.title}>QIWI-кошелёк</span>
						</div>

						<div className={styles.paymentItem}>
							<span className={styles.title}>Банковский перевод</span>
						</div>
						
						<div className={styles.paymentIcons}>
							<Visa />
							<MasterCard />
							<Maestro />
						</div>
					</div>
				)}

				{activeTabIndex === TabIndex.THIRD && (
					<div className={styles.tabDelivery}>
						<span className={styles.tabTitle}>Как получить:</span>

						<div className={styles.deliveryItem}>
							<span>Точная стоимость доставки будет рассчитана при оформлении заказа</span>

							<div className={styles.deliveryDate}>
								<span className={styles.title}>Передадим в доставку - </span>
								<span className={styles.text}>6 января</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Specifications;