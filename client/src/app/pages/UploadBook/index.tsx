import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style.module.scss';

import Button from '../../shared/components/Button';
import Error from '../../shared/components/Error';
import { Actions as FilmUploadAction } from '../../redux/book-upload/actions';
import { Actions as FilmsActions } from '../../redux/books/action';
import { ButtonTypesEnum } from '../../shared/interfaces/button.types';
import Title from '../../shared/components/Title';
import { Actions } from '../../redux/books/action';
import { getCurrentFilm } from '../../redux/books/selectors';
import { AppRoutes } from '../../routes/routes-const';
import image404 from '../../static/images/image404.jpg';
import NavBar from '../../shared/components/NavBar';

type UploadFields = {
	title: string;
	description: string;
	director: string;
	rating: number | null;
};

type UploadFilmTypes = {
	bookId?: string;
};

const UploadFilm: React.FC<UploadFilmTypes> = ({ bookId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const uploadFileElement = useRef<HTMLInputElement>(null);
	const currentFilm = useSelector(getCurrentFilm);

	const [showUploadImage, setShowUploadImage] = useState<string | null | ArrayBuffer>('');
	const [filmAvatar, setFilmAvatar] = useState('');
	const [error, setError] = useState('');

	const fieldsInitialValue: UploadFields = {
		title: '',
		description: '',
		director: '',
		rating: 0,
	};

	const [fields, setFields] = useState(fieldsInitialValue);

	useEffect(() => {
		if (bookId) {
			dispatch(Actions.getCurrentBookRequest({ bookId }));
		}; 
	}, [dispatch, bookId]);

	const toDataURL = (url: string) => {
		let xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				setShowUploadImage(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	};

	useEffect(() => {
		if (currentFilm && bookId) {
			toDataURL(currentFilm.image);

			setFields({
				title: currentFilm.title,
				description: currentFilm.description,
				director: currentFilm.director,
				rating: currentFilm.rating,
			});
		} 
	}, [currentFilm, bookId]);

	useEffect(() => {
		if (history.location.pathname === AppRoutes.UPLOAD_BOOK) {
			dispatch(Actions.uploadPage());
		};  
	}, [dispatch, history.location.pathname]);

	useEffect(() => {
		if (!currentFilm) {
			setFields(fieldsInitialValue);
			setShowUploadImage('');
		}
	}, [dispatch, currentFilm]);

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

		if (isEmpty || !filmAvatar) {
			return setError('Все поля должны быть заполнены!')
		};

		const id: string = JSON.parse(localStorage.getItem('id') as string);

		const formData = new FormData();

		if (filmAvatar) {
			formData.append('file', filmAvatar);
		};
		
		formData.append('title', fields.title);
		formData.append('description', fields.description);
		formData.append('director', fields.director);
		formData.append('rating', String(fields.rating));
		formData.append('userId', id);

		if (bookId) {
			formData.append('bookId', bookId as string);
		};
		
		if (bookId) {
			dispatch(FilmsActions.editBookRequest({ formData, id: bookId, history }));
		} else {
			dispatch(FilmUploadAction.uploadFilmRequest({ formData, history }));
		}

		setFields(fieldsInitialValue);
		setError('');
	};

	return (
		<>
			<NavBar />
			<div className={styles.uploadFilm}>
				<Title title='Загрузить книгу' goBack={true} />

				<div style={{position: 'relative'}}>
					<form className={styles.uploadFilmWrapper} onSubmit={handlerSubmit}>
						<div className={styles.uploadFilmImageWrapper}>
							<span className={styles.uploadFilmText}>Загрузите картинку для книги</span>	
							<div className={styles.uploadFilmImage}>
								{showUploadImage || (showUploadImage && currentFilm) ? (
									<img src={showUploadImage as string || image404} alt="avatar" />
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
								<input id='upload-input-1' type='text' name='title' maxLength={50} value={fields.title} onChange={handlerChangeField} />
							</div>

							<div className={styles.filed}>
								<label htmlFor='upload-input-2' className={styles.uploadFilmText}>Описание</label>
								<textarea id='upload-input-2' name='description' maxLength={500} value={fields.description} onChange={handlerChangeField} />
							</div>

							<div className={styles.filed}>
								<label htmlFor='upload-input-3' className={styles.uploadFilmText}>Автор</label>
								<input id='upload-input-3' type='text' name='director' maxLength={50} value={fields.director} onChange={handlerChangeField} />
							</div>

							<div className={styles.uploadFilmRating}>
								<span className={styles.uploadFilmText}>Выберите рейтинг книги</span>
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

							<Button text='Сохранить' type={ButtonTypesEnum.SUBMIT} onClick={handlerSubmit} />
						</div>
					</form>
					{error && <Error text={error} />}
				</div>
			</div>
		</>	
	)
}

export default UploadFilm;