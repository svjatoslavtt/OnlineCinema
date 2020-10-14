import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../../redux/films/action';
import { getPagination, getPageCount } from '../../../redux/films/selectors';

const Pagination: React.FC = () => {
	const dispatch = useDispatch();
	const pagination = useSelector(getPagination);

	const handlerPageRequest = (page: number) => {
		dispatch(Actions.getCurrentPageRequest({page}));
	};

	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationBlock}>
				{pagination && pagination.pages && pagination.pages &&
					pagination.pages.map((item: number) => {
						const key = Math.round(Math.random() * 9999)
						if (item === (pagination && pagination.currentPage)) {
							return (
								<div key={`page-${item}-${key}`} className={`${styles.paginationPage} ${styles.activePage}`} onClick={() => handlerPageRequest(item)}>
									{item}
								</div>
							);
						};

						return (
							<div key={`page-${item}-${key}`} className={styles.paginationPage} onClick={() => handlerPageRequest(item)}>
								{item}
							</div>
						);
					})
				}
				<div className={styles.paginationPage}>
					<NavigateNextIcon />
				</div>
			</div>
		</div>
	);
};

export default Pagination;