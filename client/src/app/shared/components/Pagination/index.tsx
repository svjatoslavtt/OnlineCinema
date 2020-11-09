import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';

import styles from './style.module.scss';

import { Actions } from '../../../redux/books/action';
import { getPagination } from '../../../redux/books/selectors';

enum SwitchPageEnum {
	NEXT = 1,
	PREV = -1,
};

enum HelperButtonsEnum {
	START = 'START',
	FINISH = 'FINISH',
};

const Pagination: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const pagination = useSelector(getPagination);

	const isPagination: boolean = pagination && pagination.pages && pagination.pages.length;

	const handlerPageRequest = (page: number) => {
		if (pagination.currentPage !== page) {
			scrollToTop();
			dispatch(Actions.getCurrentPageRequest({ page }));
		};

		const params = queryString.stringify({ page });

		history.replace({
			pathname: history.location.pathname,
			search: params,
		});
	};

	const scrollToTop = () => {
    animateScrollTo(window.pageYOffset - window.pageYOffset, {speed: 300, maxDuration: 1000, minDuration: 100});
	};

	const handlerHelperButton = (number: number) => {
		scrollToTop();

		history.replace({
			pathname: history.location.pathname,
			search: queryString.stringify({ page: number }),
		});

		return dispatch(Actions.getCurrentPageRequest({ page: number }));
	};

	const handlerSwitchButtons = (number: number, side?: HelperButtonsEnum) => {
		if (side) {
			switch (side) {
				case HelperButtonsEnum.START:
					handlerHelperButton(1);
					
					break;
				case HelperButtonsEnum.FINISH:
					handlerHelperButton(isPagination && pagination.lastPage);
					break;
			};
			return false;
		};

		scrollToTop();

		history.replace({
			pathname: history.location.pathname,
			search: queryString.stringify({ page: pagination.currentPage + (number) }),
		});

		dispatch(Actions.getCurrentPageRequest({ page: pagination.currentPage + (number) }));
	};

	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationBlock}>
				{isPagination && pagination.currentPage !== pagination.pages[0] ? (
					<div className={styles.paginationLastPage} onClick={() => handlerSwitchButtons(1, HelperButtonsEnum.START)}>
						Первая страница
					</div>
				) : null}

				{isPagination && pagination.currentPage !== 1 ? (
					<div className={styles.paginationPageNextPrev} onClick={() => handlerSwitchButtons(SwitchPageEnum.PREV)}>
						<NavigateBeforeIcon />
					</div>
				) : null}
				
				{pagination && pagination.pages && pagination.pages.length !== 1 ?
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
					}) : null
				}

				{isPagination && pagination.currentPage !== pagination.pages[pagination.pages.length - 1] ? (
					<div className={styles.paginationPageNextPrev} onClick={() => handlerSwitchButtons(SwitchPageEnum.NEXT)}>
						<NavigateNextIcon />
					</div>
				) : null}

				{isPagination && pagination.currentPage !== pagination.pages[pagination.pages.length - 1] ? (
					<div className={styles.paginationLastPage} onClick={() => handlerSwitchButtons(pagination.pages[pagination.pages.length - 1], HelperButtonsEnum.FINISH)}>
						Последня страница
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Pagination;