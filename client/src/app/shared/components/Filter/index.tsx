import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import styles from './style.module.scss';

import { Actions } from '../../../redux/filter/actions';
import { getDirectors, getFilterIsOpen } from '../../../redux/filter/selectors';

const Filter: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const fitlerIsOpen = useSelector(getFilterIsOpen);
	const directors = useSelector(getDirectors);

	const [filterSearch, setFilterSearch] = useState<string>('');

	useEffect(() => {
		if (fitlerIsOpen) {
			dispatch(Actions.getDirectorsRequest());
		}
	}, [dispatch, fitlerIsOpen]);

	const handlerCloseFilter = () => dispatch(Actions.closeFilter());

	const handlerSubmitForm = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target);
		const obj: any = {
			title: '',
			director: [],
		};

		data.forEach((value, key) => {
			if (key === 'title') {
				obj[key] = value;
			} else {
				obj.director.push(key);
			};
		});

		let sendData: any = {};

		for (let key in obj) {
			if (obj[key] !== '' && obj[key].length) {
				sendData[key] = obj[key];
			};
		};

		const params = queryString.stringify(sendData);

		history.replace({
			pathname: history.location.pathname,
			search: params,
		});

		if (sendData.hasOwnProperty('title')) {
			dispatch(Actions.filterRequest({ title: sendData.title }));
		} else if (Object.keys(sendData).length !== 0) {
			dispatch(Actions.filterRequest(sendData));
		};

		setFilterSearch('');

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

				<form onSubmit={handlerSubmitForm}>
					<div className={styles.filterConter}>
						<div className={styles.filterSearchBlock}>
							<label htmlFor="input-search-1">Поиск:</label>
							<input id="input-search-1" type="text" name="title" value={filterSearch} onChange={e => setFilterSearch(e.target.value)} />
						</div>

						<div className={styles.filterByDirector}>
							<span>По режиссёрам:</span>

							<div className={styles.inputsWrapper}>
								{directors && 
									directors.length &&
										directors.map((item: any, index: number) => {
											const inputKey = `director-input-${index}-${Math.round(Math.random() * 99999)}`;
											return (
												<div key={index} className={styles.directorBlock}>
													<label htmlFor={inputKey}>{item}</label>
													<input id={inputKey} name={item} type='checkbox' />
												</div>
											)
										})		
								}
							</div>
						</div>

						<div className={styles.filterButtonSubmit}>
							<button type='submit'>Поиск</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Filter;