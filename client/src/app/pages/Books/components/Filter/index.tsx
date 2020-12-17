import React, { useEffect, useState } from 'react';
import { DROPDOWN_DATA } from './filter-data';

import styles from './style.module.scss';

type FilterTypes = {
	data: any;
};

const Filter: React.FC<FilterTypes> = ({ data }) => {
	const [isShowDropdown, setIsShowDropDown] = useState(false);

	return (
		<aside className={styles.aside}>
			<div className={styles.asideContainer}>

				{data.map((item: any) => {
					const { top } = item;

					return (
						<div className={styles.asideList}>
								<div className={styles.asideTitle} onClick={setIsShowDropDown.bind(null, true)}>
									<div>
										{item.title}
										<span className={styles.popularElements}>{`топ ${item.top.length}`}</span>
									</div>

									<i className="fas fa-sort-up"></i>
								</div>
		
							<div className={styles.asideElementsWrapper}>
								{top.map((item: any) => {
									return (
										<div key={item.id} className={styles.asideElement}>{item.title}</div>
									)
								})}
							</div>
						</div>
					)
				})}
			</div>
			
			{isShowDropdown && (
				<div className={styles.asideDropdownList}>
					<div className={styles.asideDropdownListWrapper}>
						<div className={styles.search}>
							<input type="text" name="search" placeholder="Поиск" />
						</div>

						<div className={styles.dropdownElementsWrapper}>
							{DROPDOWN_DATA.map((item: any) => {
								return (
									<div className={styles.asideElement}>{item.title}</div>
								)
							})}
						</div>
					</div>
				</div>
			)}
		</aside>
	);
};

export default Filter;