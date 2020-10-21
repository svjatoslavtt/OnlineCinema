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

	const [checkedDirectors, setCheckedDirectors] = useState<null | { director: string[] }>(null);

	const [filterSearch, setFilterSearch] = useState<string>('');

	useEffect(() => {
		if (fitlerIsOpen) {
			dispatch(Actions.getDirectorsRequest());
		}
	}, [dispatch, fitlerIsOpen]);

	const handlerCloseFilter = () => dispatch(Actions.closeFilter());

	useEffect(() => {
		const parseUrl = queryString.parseUrl(history.location.search);

		if (Object.keys(parseUrl.query).length !== 0) {
			if (parseUrl.query.title) {
				const title = parseUrl.query.title;
				dispatch(Actions.filterRequest({ title }));
			} else if (!parseUrl.query.page) {
				dispatch(Actions.filterRequest(parseUrl.query));
			}
		};
	}, [dispatch, history.location.search]);

	const handlerSubmitForm = (event: any) => {
		event.preventDefault();
		const data = new FormData(event.target);

		// create common object with filter data 
		const obj: any = {
			title: '',
			director: {},
			popular: false,
		};

		data.forEach((value, key) => {
			if (key === 'title') {
				obj[key] = value as string;
			} else if (key === 'popular') {
				obj[key] = value === 'on' && true;
			} else {
				obj.director = {
					...obj.director,
					[key]: value === 'on' && true
				};
			}
		});

		// if filter has title then return only title and put on in url params
		if (obj.title !== '') {
			const params = queryString.stringify({ title: obj.title });
			history.replace({
				pathname: history.location.pathname,
				search: params,
			});

			return dispatch(Actions.filterRequest({ title: obj.title }));
		};

		// return all others filter data and put on in url params
		let sendData: any = {};

		for (let key in obj) {
			if (obj[key] === 'title') delete obj.title
			if (Object.values(obj[key]).length !== 0 || obj[key] === true) {
				sendData[key] = obj[key];
			};
		};

		let directorsParams = '';
		if (sendData.hasOwnProperty('director')) {
			if (Object.keys(sendData.director).length !== 0) {
				directorsParams = queryString.stringify({ directors: Object.keys(sendData.director) }, {arrayFormat: 'index'});
			};	
		};
		
		const popularParams = queryString.stringify({ popular: sendData.popular });

		if (Object.keys(sendData).length !== 0) {
			history.replace({	
				pathname: history.location.pathname,
				search: createParamsString([directorsParams, popularParams]),
			});

			dispatch(Actions.filterRequest(sendData));
		};

		// clear filter data and close filter component
		setFilterSearch('');
		dispatch(Actions.closeFilter());
	};

	const createParamsString = (params: string[]) => {
		if (params.length) {
			const str = params.join('&');

			if (str[str.length - 1] === '&') {
				return str.substring(0, str.length - 1);
			} 

			return str;
		};
	};

	useEffect(() => {
		const parseUrl = queryString.parseUrl(history.location.search);
		if (parseUrl.query.director) {
			setCheckedDirectors(parseUrl.query as { director: string[] });
		} else {
			setCheckedDirectors(null);
		}
	}, [history.location.search]) ;

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

						<div className={styles.filterSection}>
							<span>По режиссёрам:</span>

							<div className={styles.inputsWrapper}>
								{directors && 
									directors.length &&
										directors.map((item: any, index: number) => {
											const inputKey = `director-input-${index}-${Math.round(Math.random() * 99999)}`;

											let isChecked = false;

											if (checkedDirectors && checkedDirectors.director && checkedDirectors.director.includes(item)) {
												isChecked = true;
											}
											return (
												<div key={index} className={styles.inputBlock}>
													<label htmlFor={inputKey}>{item}</label>
													<input 
													id={inputKey} 
													name={item} 
													type='checkbox'
													defaultChecked={isChecked} 
												/>
												</div>
											)
										})		
								}
							</div>
						</div>

						<div className={styles.filterSection}>
							<span>По популярности:</span>

							<div className={styles.inputsWrapper}>
								<div className={styles.inputBlock}>
									<label htmlFor='input-popular-394'>Cамые популярные</label>
									<input 
										id='input-popular-394' 
										name='popular' 
										type='checkbox'
								/>
								</div>
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