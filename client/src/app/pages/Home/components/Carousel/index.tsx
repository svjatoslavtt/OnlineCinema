import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import styles from './style.module.scss';

import CarouselItem from '../CarouselItem';

import { ITEM_DATA } from '../../data/carousel-item-data';

const HomeCarousel: React.FC = () => {
	const indicatorStyles = {
		display: 'flex',
		justifyContent: 'center',
		margin: '0 8px',
		color: '#fff',
		fontSize: '14px',
		fontFamily: 'Times-New-Roman, sans-serif',
		cursor: 'pointer',
		outline: 'none',
		alignItems: 'center',
		lineHeight: 1.1,
		background: '#333333fa',
		height: 10,
		width: 10,
		borderRadius: '50%',
	};
	
	return (
		<div className={styles.carouselOfAnnouncement}>
			<Carousel 
				showArrows={false} 
				showThumbs={false} 
				showStatus={false} 
				showIndicators={true} 
				autoPlay={true}
				interval={3000}
				transitionTime={400}
				infiniteLoop={true}
				stopOnHover={true}
				renderIndicator={(onClickHandler, isSelected, index, label) => {
					if (isSelected) {
						return (
							<li
								style={{ ...indicatorStyles, background: '#009688', }}
								aria-label={`Selected: ${label} ${index + 1}`}
								title={`Selected: ${label} ${index + 1}`}
							></li>
						);
					}
					return (
						<li
							style={indicatorStyles}
							onClick={onClickHandler}
							onKeyDown={onClickHandler}
							value={index}
							key={index}
							role="button"
							tabIndex={0}
							title={`${label} ${index + 1}`}
							aria-label={`${label} ${index + 1}`}
						></li>
					);
			}}
			>
				{ITEM_DATA.map((props, index) => (
					<CarouselItem key={index} {...props} />
				))}
			</Carousel >
		</div>
	);
};

export default HomeCarousel;