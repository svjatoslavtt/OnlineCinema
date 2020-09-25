import React from 'react';

import styles from './style.module.scss';

interface ErrorProps {
	text: string;
};

const Error: React.FC<ErrorProps> = ({ text }) => (
	<span className={styles.errors}>{text}</span>
);

export default Error;