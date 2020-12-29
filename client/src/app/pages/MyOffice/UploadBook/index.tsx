import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style.module.scss';

import Button from '../../../shared/components/Button';
import Error from '../../../shared/components/Error';
import { Actions as BookUploadAction } from '../../../redux/book-upload/actions';
import { Actions as BooksActions } from '../../../redux/books/action';
import { ButtonTypesEnum } from '../../../shared/types/button.types';
import { Actions } from '../../../redux/books/action';
import { getCurrentBook } from '../../../redux/books/selectors';
import { AppRoutes } from '../../../routes/routes-const';
import image404 from '../../../static/images/image404.jpg';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';
import Banner from '../../../shared/components/Banner';

type UploadFields = {
	title: string;
	description: string;
	director: string;
	rating: number | null;
};

type UploadBookTypes = {
	bookId?: string;
};

const UploadBook: React.FC<UploadBookTypes> = ({ bookId }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const uploadFileElement = useRef<HTMLInputElement>(null);
	const currentBook = useSelector(getCurrentBook);

	const [showUploadImage, setShowUploadImage] = useState<string | null | ArrayBuffer>('');
	const [bookAvatar, setBookAvatar] = useState('');
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
		if (currentBook && bookId) {
			toDataURL(currentBook.image);

			setFields({
				title: currentBook.title,
				description: currentBook.description,
				director: currentBook.director,
				rating: currentBook.rating,
			});
		} 
	}, [currentBook, bookId]);

	useEffect(() => {
		if (history.location.pathname === AppRoutes.UPLOAD_BOOK) {
			dispatch(Actions.uploadPage());
		};  
	}, [dispatch, history.location.pathname]);

	useEffect(() => {
		if (!currentBook) {
			setFields(fieldsInitialValue);
			setShowUploadImage('');
		}
	}, [dispatch, currentBook]);

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
		setBookAvatar(event.target.files[0]);
	};

	const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const isEmpty = Object.values(fields).some((item) => item === '' || item === 0 || !item);

		if (isEmpty || !bookAvatar) {
			return setError('Все поля должны быть заполнены!')
		};

		const id: string = JSON.parse(localStorage.getItem('id') as string);

		const formData = new FormData();

		if (bookAvatar) {
			formData.append('file', bookAvatar);
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
			dispatch(BooksActions.editBookRequest({ formData, id: bookId, history }));
		} else {
			dispatch(BookUploadAction.uploadBookRequest({ formData, history }));
		}

		setFields(fieldsInitialValue);
		setError('');
	};

	return (
		<>
			<Header />
			<Banner title='Загрузить книгу' />

			<div className={styles.uploadBook}>
				<div style={{position: 'relative'}}>
					<form className={styles.uploadBookWrapper} onSubmit={handlerSubmit}>
						<div className={styles.uploadBookFields}>
							<div className={styles.filed}>
								<input 
									id='upload-input-1' 
									type='text' 
									name='title' 
									maxLength={50} 
									value={fields.title} 
									onChange={handlerChangeField} 
									placeholder='Название'
								/>
							</div>

							<div className={styles.filed}>
								<textarea 
									id='upload-input-2' 
									name='description' 
									maxLength={500} 
									value={fields.description} 
									onChange={handlerChangeField} 
									placeholder='Описание'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-3' 
									type='text' name='director' 
									maxLength={50} 
									value={fields.director} 
									onChange={handlerChangeField} 
									placeholder='Автор'
								/>
							</div>

							{/* <div className={styles.uploadBookRating}>
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
							</div> */}

							<Button text='Добавить' type={ButtonTypesEnum.SUBMIT} onClick={handlerSubmit} />
						</div>

						<div className={styles.uploadBookImageWrapper}>
							<div className={styles.uploadBookImage}>
								{showUploadImage || (showUploadImage && currentBook) ? (
									<img src={showUploadImage as string || image404} alt="avatar" />
								) : (
									<span>view</span> 
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
					</form>
				</div>
			</div>

			<Footer />
		</>	
	)
}

export default UploadBook;