import React from 'react';

import styles from './style.module.scss';

const Filter: React.FC = () => {

	return (
		<aside className={styles.aside}>
			<div className={styles.asideContainer}>
				<div className={styles.asideList}>
					<div className={styles.asideTitle}>Категории</div>
					<div className={styles.asideElement}>По акции</div>
					<div className={styles.asideElement}>Самые популярные</div>
					<div className={styles.asideElement}>Самые продаваемые</div>
				</div>

				<div className={styles.asideList}>
					<div className={styles.asideTitle}>Авторы</div>
					<div className={styles.asideElement}>Мартин Скорсезе</div>
					<div className={styles.asideElement}>Гай ричи</div>
					<div className={styles.asideElement}>Девид Линч</div>
					<div className={styles.asideElement}>Квентин Тарантино</div>
					<div className={styles.asideElement}>Мартин Скорсезе</div>
					<div className={styles.asideElement}>Гай ричи</div>
					<div className={styles.asideElement}>Девид Линч</div>
					<div className={styles.asideElement}>Мартин Скорсезе</div>
					<div className={styles.asideElement}>Гай ричи</div>
					<div className={styles.asideElement}>Девид Линч</div>
					<div className={styles.asideElement}>Квентин Тарантино</div>
					<div className={styles.asideElement}>Мартин Скорсезе</div>
					<div className={styles.asideElement}>Гай ричи</div>
					<div className={styles.asideElement}>Девид Линч</div>

					<div className={styles.asideMoreButton}>ещё</div>
				</div>
			</div>
		</aside>
	);
};

export default Filter;