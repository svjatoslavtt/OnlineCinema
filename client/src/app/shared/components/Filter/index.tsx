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

	const [titleData, setTitleData] = useState<{ title: string }>({ title: '' });
	const [directorsData, setDirectorsData] = useState<{ [key: string]: string } | any>({});
	const [popularData, setPopularData] = useState({ popular: false });

	useEffect(() => {
		if (fitlerIsOpen) {
			dispatch(Actions.getDirectorsRequest());
		}
	}, [dispatch, fitlerIsOpen]);

	const handlerCloseFilter = () => dispatch(Actions.closeFilter());

	const handlerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDirectorsData({});
		setPopularData({ popular: false });
		setTitleData({ title: event.target.value });
	};

	const handlerDirectorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (directorsData[event.target.name]) {
			return setDirectorsData({
				...directorsData,
				[event.target.name]: false
			});
		};

		setTitleData({ title: '' });
		setPopularData({ popular: false });

		setDirectorsData({
			...directorsData,
			[event.target.name]: event.target.value === 'on',
		});
	};

	const handlerPopularChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (popularData.popular) {
			return setPopularData({ popular: false });
		};

		setDirectorsData({});
		setTitleData({ title: '' });

		setPopularData({ popular: event.target.value === 'on' });
	};

	// parse filtering data from url params
	useEffect(() => {
		const parseUrl = queryString.parseUrl(history.location.search, { arrayFormat: 'index' });

		if (Object.keys(parseUrl.query).length !== 0) {
			if (parseUrl.query.title) {
				const title = parseUrl.query.title;
				dispatch(Actions.filterRequest({ title }));
			} else if (parseUrl.query.director) {
				dispatch(Actions.filterRequest({ director: parseUrl.query.director }));
			} else if (parseUrl.query.popular) {
				dispatch(Actions.filterRequest({ popular: true }));
			};
		};
	}, [dispatch]);

	const handlerCreateUrlParams = (title: string, data: any) => {
		const params = queryString.stringify({ [title]: data }, { arrayFormat: 'index' });
		return history.replace({
			pathname: history.location.pathname,
			search: params,
		});
	};

	const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// filtering data by title
		if (titleData.title) {
			handlerCreateUrlParams('title', titleData.title);
			setDirectorsData({});
			setPopularData({ popular: false });

			return dispatch(Actions.filterRequest(titleData)); 
		};

		// filtering data by directors
		if (Object.keys(directorsData).length !== 0) {
			const directors = Object.keys(directorsData).filter(item => directorsData[item]);
			handlerCreateUrlParams('director', directors);

			return dispatch(Actions.filterRequest({ director: directors }));
		};

		// filtering data by popular
		if (popularData.popular) {
			handlerCreateUrlParams('popular', popularData.popular);

			return dispatch(Actions.filterRequest(popularData));
		};
	};

	// set up checkboxes checked from params
	useEffect(() => {
		const parseUrl = queryString.parseUrl(history.location.search, { arrayFormat: 'index' });

		if (parseUrl.query.director) {
			const directors: string[] = parseUrl.query.director as string[];
			const customDirectorsObject = directors.reduce((acc: { [key: string]: boolean }, curr: string) => {
				return acc = {
					...acc,
					[curr]: true,
				};
			}, {});

			setDirectorsData(customDirectorsObject);
		} else if (parseUrl.query.popular) {
			setPopularData({ popular: true });
		};
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
							<label htmlFor="input-search-1">По названию:</label>
							<input id="input-search-1" type="text" name="title" value={titleData.title} onChange={handlerTitleChange} />
						</div>

						<div className={styles.filterSection}>
							<span>По авторам:</span>

							<div className={styles.inputsWrapper}>
								{directors && 
									directors.length ?
										directors.map((item: any, index: number) => {
											const inputKey = `director-input-${index}-${Math.round(Math.random() * 99999)}`;

											return (
												<div key={index} className={styles.inputBlock}>
													<label htmlFor={inputKey}>{item}</label>
													<input 
													id={inputKey} 
													name={item} 
													type='checkbox'
													onChange={handlerDirectorsChange}
													checked={!!directorsData[item]}
												/>
												</div>
											)
										}) : <div>Авторов пока нет</div>
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
										onChange={handlerPopularChange}
										checked={popularData.popular}
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