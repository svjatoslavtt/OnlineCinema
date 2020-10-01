import Rating from '@material-ui/lab/Rating';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './style.module.scss';

import Button from '../../../../shared/components/Button';
import Error from '../../../../shared/components/Error';
import { Actions } from '../../../../redux/film-upload/actions';
import { ButtonTypes } from '../../../../shared/interfaces/button.types';

type UploadFields = {
	title: string;
	description: string;
	rating: number | null;
};

const UploadFilm: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const uploadFileElement = useRef<HTMLInputElement>(null);

	const fieldsInitialValue: UploadFields = {
		title: '',
		description: '',
		rating: 0,
	};

	const [showUploadImage, setShowUploadImage] = useState<string | null | ArrayBuffer>('');
	const [filmAvatar, setFilmAvatar] = useState('');
	const [fields, setFields] = useState(fieldsInitialValue);
	const [error, setError] = useState('');

	const handlerChangeField = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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

		setFilmAvatar(event.target.files[0]);

		reader.onload = () => {
			if (reader.readyState === 2) {
				setShowUploadImage(reader.result);
			}
		}
		reader.readAsDataURL(event.target.files[0]);
		setFilmAvatar(event.target.files[0]);
	};

	const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const isEmpty = Object.values(fields).some((item) => item === '' || item === 0 || !item);

		if (isEmpty) {
			return setError('Все поля должны быть заполены!')
		};

		const { id }: { id: string } = JSON.parse(localStorage.getItem('id') as string);

		const formData = new FormData();
		formData.append('file', filmAvatar);
		formData.append('title', fields.title);
		formData.append('description', fields.description);
		formData.append('rating', String(fields.rating));
		formData.append('userId', id);
		
		dispatch(Actions.uploadFilmRequest({formData, history}));

		setFields(fieldsInitialValue);
		setError('');
	};

	return (
		<div>
			<div className={styles.uploadFilmTitle}>
				Загрузить фильм
			</div>

			<div style={{position: 'relative'}}>
				<form className={styles.uploadFilmWrapper} onSubmit={handlerSubmit}>
					<div className={styles.uploadFilmImageWrapper}>
						<span className={styles.uploadFilmText}>Загрузите картинку для фильма</span>	
						<div className={styles.uploadFilmImage}>
							{showUploadImage ? (
								<img src={showUploadImage as string} alt="avatar" />
							) : (
								<span>avatar</span> 
							)}
						</div>
						<input 
							ref={uploadFileElement} 
							type='file' 
							name='image' 
							accept="image/*" 
							onChange={handlerUploadImage} 
							className={styles.inputUploadFile}
							onClick={handlerUseInputFile}
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

						<Button text='Сохранить' type={ButtonTypes.SUBMIT} onClick={handlerSubmit} />
					</div>
				</form>
				{error && <Error text={error} />}
			</div>
		</div>
	)
}

export default UploadFilm;