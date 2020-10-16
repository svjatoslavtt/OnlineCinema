import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import styles from './style.module.scss';

import { Actions } from '../../../redux/films/action';
import { getPagination } from '../../../redux/films/selectors';

const Pagination: React.FC = () => {
	const dispatch = useDispatch();
	const pagination = useSelector(getPagination);

	const handlerPageRequest = (page: number) => {
		if (pagination.currentPage !== page) {
			dispatch(Actions.getCurrentPageRequest({page}));
		};
	};

	const handlerNextPrevButtons = (action: string) => {
		switch (action) {
			case 'prev':
				dispatch(Actions.getCurrentPageRequest({page: pagination.currentPage - 1}));
				break;
			case 'next':
				dispatch(Actions.getCurrentPageRequest({page: pagination.currentPage + 1}));
				break;
		};
	};

	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationBlock}>
				{pagination && pagination.currentPage !== 1 && (
					<div className={styles.paginationPageNextPrev} onClick={() => handlerNextPrevButtons('prev')}>
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
					<div className={styles.paginationPageNextPrev} onClick={() => handlerNextPrevButtons('next')}>
						<NavigateNextIcon />
					</div>
				)}
			</div>
		</div>
	);
};

export default Pagination;