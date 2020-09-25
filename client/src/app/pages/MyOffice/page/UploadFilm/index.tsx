import Rating from '@material-ui/lab/Rating';
import React, { useRef, useState } from 'react';

import styles from './style.module.scss';

import Button from '../../../../shared/components/Button';
import Error from '../../../../shared/components/Error';

interface UploadFields {
	image: string | null | ArrayBuffer;
	title: string;
	description: string;
	rating: number | null;
}

const UploadFilm: React.FC = () => {
	const uploadFileElement = useRef<HTMLInputElement>(null);

	const fieldsInitialValue: UploadFields = {
		image: '',
		title: '',
		description: '',
		rating: 0,
	};

	const [fields, setFields] = useState(fieldsInitialValue);
	const [error, setError] = useState('');

	const handlerChangeField = (event: any) => {
		setFields({
			...fields,
			[event.target.name]: event.target.value,
		});
	};

	const handlerUseInputFile = () => {
		if (uploadFileElement.current) {
			uploadFileElement.current.click();
		}
	};

	const handlerUploadImage = (event: any) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setFields(prevState => ({
					...prevState,
					image: reader.result,
				}));
			}
		}
		reader.readAsDataURL(event.target.files[0]);
	};

	const handlerSubmit = () => {
		const isEmpty = Object.values(fields).some((item) => item === '' || item === 0 || !item);

		if (isEmpty) {
			return setError('Все поля должны быть заполены!')
		}
		
		setError('');
		setFields(fieldsInitialValue);
	};

	return (
		<div>
			<div className={styles.uploadFilmTitle}>
				Загрузить фильм
			</div>

			<div className={styles.uploadFilmWrapper}>
				<div className={styles.uploadFilmImageWrapper}>
					<span className={styles.uploadFilmText}>Загрузите картинку для фильма</span>	
					<div className={styles.uploadFilmImage}>
						{fields.image ? (
							<img src={fields.image as string} alt="avatar" />
						) : (
							<span>avatar</span> 
						)}
					</div>
					<input 
						ref={uploadFileElement} 
						type='file' 
						name='image-upload' 
						accept="image/*" 
						onChange={handlerUploadImage} 
						className={styles.inputUploadFile}
					/>
					<Button text='Загрузить' onClick={handlerUseInputFile} />
				</div>

				<div className={styles.uploadFilmFields}>
					<div className={styles.filed}>
						<label htmlFor='upload-input-1' className={styles.uploadFilmText}>Название</label>
						<input id='upload-input-1' type='text' name='title' value={fields.title} onChange={handlerChangeField} />
					</div>

					<div className={styles.filed}>
						<label htmlFor='upload-input-2' className={styles.uploadFilmText}>Описание</label>
						<textarea id='upload-input-2' name='description' value={fields.description} onChange={handlerChangeField} />
					</div>

					<div className={styles.uploadFilmRating}>
						<span className={styles.uploadFilmText}>Выберите рейтинг фильма</span>
						<Rating
							name='simple-controlled'
							value={fields.rating}
							onChange={(_, newValue) => {
								setFields(prevState => ({
									...prevState,
									rating: newValue,
								}));
							}}
						/>
					</div>

					<Button text='Сохранить' onClick={handlerSubmit} />
				</div>

				{error && <Error text={error} />}
			</div>
		</div>
	)
}

export default UploadFilm;