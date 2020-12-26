import React from 'react';

import styles from './style.module.scss';

type BadgeTypes = {
	badge: string;
};

const Badge: React.FC<BadgeTypes> = ({ badge }) => {
	return (
		<div className={styles.badge}>{badge}</div>
	);
};

export default Badge;