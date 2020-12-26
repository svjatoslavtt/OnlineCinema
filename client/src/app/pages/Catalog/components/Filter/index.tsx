import React, { useState } from 'react';
import { DROPDOWN_DATA, DROPDOWN_DATA_TWO } from './filter-data';

import styles from './style.module.scss';

type FilterTypes = {
	data: any;
};

const Filter: React.FC<FilterTypes> = ({ data }) => {
	const dropdownInitialState: any = {
		isOpen: false,
		type: '',
		data: null,
	};

	const [dropdown, setDropdown] = useState(dropdownInitialState);

	const handlerOutplace = () => {
		setDropdown(dropdownInitialState);
	};

	const handlerDropdownList = (type: string) => {
		if (!type) {
			return;
		}
		
		switch (type) {
			case 'genres':
				if (dropdown.type === type) {
					return setDropdown(dropdownInitialState);
				}
				setDropdown({
					isOpen: true,
					type,
					data: DROPDOWN_DATA_TWO,
				});
				break;
			case 'authors':
				if (dropdown.type === type) {
					return setDropdown(dropdownInitialState);
				}
				setDropdown({
					isOpen: true,
					type,
					data: DROPDOWN_DATA,
				});
				break;
			default:
				return setDropdown(dropdownInitialState); 	
		}
	};

	return (
		<aside className={styles.aside}>
			{dropdown.isOpen && <div className={styles.outplace} onClick={handlerOutplace}></div>}

			<div className={styles.asideContainer}>

				{data.map((item: any) => {
					const { top } = item;

					return (
						<div key={item.id} className={styles.asideList}>
							<div className={styles.asideTitle} onClick={handlerDropdownList.bind(null, item.type)}>
								<div>
									{item.title}
									<span className={styles.popularElements}>{`топ ${item.top.length}`}</span>
								</div>

								{item.dropdown && <i className="fas fa-sort-up"></i>}
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
			
			{dropdown.isOpen && (
				<div className={styles.asideDropdownList}>
					<div className={styles.asideDropdownListWrapper}>
						<div className={styles.search}>
							<input type="text" name="search" placeholder="Поиск" />
						</div>

						<div className={styles.dropdownElementsWrapper}>
							{dropdown.data && dropdown.data.length && dropdown.data.map((item: any) => {
								return (
									<div key={item.id} className={styles.asideElement}>{item.title}</div>
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