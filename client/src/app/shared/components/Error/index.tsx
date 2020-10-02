import React from 'react';

import styles from './style.module.scss';

type ErrorTypes = {
	text: string;
};

const Error: React.FC<ErrorTypes> = ({ text }) => (
	<span className={styles.errors}>{text}</span>
);

export default Error;