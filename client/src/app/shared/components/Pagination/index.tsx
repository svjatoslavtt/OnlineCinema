import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import styles from './style.module.scss';

import { Actions } from '../../../redux/films/action';
import { getPagination } from '../../../redux/films/selectors';

enum SwitchPageEnum {
	NEXT = 1,
	PREV = -1,
};

const Pagination: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const pagination = useSelector(getPagination);

	const handlerPageRequest = (page: number) => {
		if (pagination.currentPage !== page) {
			dispatch(Actions.getCurrentPageRequest({ page }));
		};

		const params = queryString.stringify({ page });

		history.replace({
			pathname: history.location.pathname,
			search: params,
		});
	};

	const handlerSwitchButtons = (number: number) => {
		dispatch(Actions.getCurrentPageRequest({ page: pagination.currentPage + (number) }));

		history.replace({
			pathname: history.location.pathname,
			search: queryString.stringify({ page: pagination.currentPage + (number) }),
		});
	};

	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationBlock}>
				{pagination && pagination.currentPage !== 1 && (
					<div className={styles.paginationPageNextPrev} onClick={() => handlerSwitchButtons(SwitchPageEnum.PREV)}>
						<NavigateBeforeIcon />
					</div>
				)}
				
				{pagination && pagination.pages && pagination.pages &&
					pagination.pages.map((item: number) => {
						const key = Math.round(Math.random() * 9999)
						if (item === (pagination && pagination.currentPage)) {
							return (
								<div key={`page-${item}-${key}`} className={`${styles.paginationPage} ${styles.activePage}`} onClick={() => handlerPageRequest(item)}>
									<span>{item}</span>
								</div>
							);
						};

						return (
							<div key={`page-${item}-${key}`} className={styles.paginationPage} onClick={() => handlerPageRequest(item)}>
								<span>{item}</span>
							</div>
						);
					})
				}

				{pagination && pagination.currentPage !== pagination.pages[pagination.pages.length - 1] && (
					<div className={styles.paginationPageNextPrev} onClick={() => handlerSwitchButtons(SwitchPageEnum.NEXT)}>
						<NavigateNextIcon />
					</div>
				)}
			</div>
		</div>
	);
};

export default Pagination;