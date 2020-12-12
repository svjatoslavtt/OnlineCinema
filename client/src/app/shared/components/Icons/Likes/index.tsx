import React from 'react';
import { useSelector } from 'react-redux';
import { getIsLikeBook } from '../../../../redux/books/selectors';
import DislikeSvg from './Dislike';
import LikeSvg from './Like';

import style from './style.module.scss';

type LikeTypes = {
	onClick: () => void;
};

const Likes: React.FC<LikeTypes> = ({ onClick }) => {
	const isLike = useSelector(getIsLikeBook);

	return (
		<div className={style.likeSvg} onClick={onClick}>
			{
				isLike ? (
					<LikeSvg />
				) : (
					<DislikeSvg />
				)
			}
		</div>
	)
};

export default Likes;