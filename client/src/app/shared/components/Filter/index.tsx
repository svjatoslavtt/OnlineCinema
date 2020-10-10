import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';

import styles from './style.module.scss';

import { Actions } from '../../../redux/filter/actions';
import { getDirectors, getFilterIsOpen } from '../../../redux/filter/selectors';

const Filter: React.FC = () => {
	const dispatch = useDispatch();
	const fitlerIsOpen = useSelector(getFilterIsOpen);
	const directors = useSelector(getDirectors);

	useEffect(() => {
		if (fitlerIsOpen) {
			dispatch(Actions.getDirectorsRequest());
		}
	}, [dispatch, fitlerIsOpen]);

	const initalFilterData = {
		title: '',
		directors: [],
	};

	const [filterData, setFilterData] = useState(initalFilterData);

	useEffect(() => {
		setFilterData(prevState => ({
			...prevState,
			directors,
		}));
	}, [directors]);

	const handlerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterData({
			...filterData,
			[event.target.name]: event.target.value,
		});
	};

	const handlerCloseFilter = () => dispatch(Actions.closeFilter());

	const handlerSubmit = () => {
		dispatch(Actions.filterRequest(filterData.title));
		dispatch(Actions.closeFilter());
	};

	const filterStyles = [styles.filterBlock, fitlerIsOpen ? styles.active : null];
	const filterContainerStyles = [styles.filterContainer, fitlerIsOpen ? styles.active : null];

	return (
		<div className={filterContainerStyles.join(' ')}>
			<div className={filterStyles.join(' ')}>
				<div className={styles.filterButtonClose}>
					<CancelIcon onClick={handlerCloseFilter} />
				</div>

				<div className={styles.filterConter}>
					<div className={styles.filterSearchBlock}>
						<label htmlFor="input-search-1">Поиск:</label>
						<input id="input-search-1" type="text" name="title" onChange={handlerTitleChange} />
					</div>

					<div className={styles.filterByDirector}>
						<span>По режиссёрам:</span>

						<div className={styles.inputsWrapper}>
							{filterData.directors && 
								filterData.directors.length &&
									filterData.directors.map((item: any, index: number) => {
										const inputKey = Math.round(Math.random() * 99999);
										return (
											<div key={index} className={styles.directorBlock}>
												<label htmlFor={`director-input-${index}-${inputKey}`}>{item}</label>
												<input id={`director-input-${index}-${inputKey}`} type="checkbox"/>
											</div>
										)
									})		
							}
							
						</div>
					</div>

					<div className={styles.filterButtonSubmit}>
						<button onClick={handlerSubmit}>Поиск</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filter;