import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import styles from './style.module.scss';

import { Actions } from '../../../../../redux/books/action';

type ButtonsTypes = {
	bookId: string;
	isSaved: boolean;
};

const Buttons: React.FC<ButtonsTypes> = ({ bookId, isSaved }) => {
	const dispatch = useDispatch();

	const [isSavedValue, setIsSavedValue] = useState<boolean>(isSaved);

	const token: string = JSON.parse(localStorage.getItem('token') as string);

	const saveBookForLater = useCallback(
		_.debounce(
			() => {
				if (token) {
					if (!isSavedValue) {
						dispatch(Actions.saveBookRequest({ bookId }));
						setIsSavedValue(true);
					} else {
						dispatch(Actions.removeSavedBookRequest({ bookId }));
						setIsSavedValue(false);
					}
				} else {
					console.log('Auth error!');
				}
			}, 
			500, 
			{
				leading: true,
				trailing: false,
			}
	), [isSavedValue, token]);

	const addToFavoriteStyles = [styles.addToFavorite, isSavedValue ? styles.save : styles.unsave];

	return (
		<div className={styles.bookButtons}>
			<button className={styles.addToCart}>В корзину</button>
			<div className={addToFavoriteStyles.join(' ')} onClick={saveBookForLater}><i className="fas fa-bookmark" title="Сохранить книгу"></i></div>
		</div>
	);
};

export default Buttons;