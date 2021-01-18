import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

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
import { BookUploadType, BookData } from '../../../shared/types/book-upload.types';

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

	const { register, handleSubmit, errors } = useForm<BookData>();

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
			toDataURL(currentBook.file);
		} 
	}, [currentBook, bookId]);

	useEffect(() => {
		if (history.location.pathname === AppRoutes.UPLOAD_BOOK) {
			dispatch(Actions.uploadPage());
		};  
	}, [dispatch, history.location.pathname]);

	useEffect(() => {
		if (!currentBook) {
			setShowUploadImage('');
		}
	}, [dispatch, currentBook]);

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

	const onSubmit = (data: BookData) => {
		const form: BookUploadType = {
			...data,
			date: Date.now(),
			file: currentBook?.file ? currentBook?.file : bookAvatar,
		};

		const formData = new FormData();

		Object.entries(form).forEach((item: any) => {
			if (item[0] !== 'file') {
				formData.append(item[0], item[1].toString().trim());
			} else {
				formData.append(item[0], item[1]);
			}
		});
		
		dispatch(BookUploadAction.uploadBookRequest({ formData, history }));
	};

	return (
		<>
			<Header />
			<Banner title='Загрузить книгу' />

			<div className={styles.uploadBook}>
				<div style={{position: 'relative'}}>
					<form className={styles.uploadBookWrapper} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.uploadBookFields}>
							<div className={styles.filed}>
								<input 
									id='upload-input-1' 
									type='text' 
									name='title' 
									defaultValue={currentBook?.title}
									ref={register({ required: true, minLength: 3 })}
									placeholder='Название'
								/>
							</div>

							<div className={styles.filed}>
								<textarea 
									id='upload-input-2' 
									name='description' 
									defaultValue={currentBook?.description}
									maxLength={500}
									ref={register({ required: true, minLength: 3, maxLength: 500 })}
									placeholder='Описание'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-3' 
									type='text' name='author' 
									defaultValue={currentBook?.author}
									ref={register({ required: true, minLength: 3 })}
									placeholder='Автор'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-4' 
									type='text' name='genre' 
									defaultValue={currentBook?.genre}
									ref={register({ required: true, minLength: 3, maxLength: 50 })}
									placeholder='Жанр'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-5' 
									type='text' name='publishingHouse' 
									defaultValue={currentBook?.publishingHouse}
									ref={register({ minLength: 3, maxLength: 50 })}
									placeholder='Издательство'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-6' 
									type='text' name='isbn' 
									defaultValue={currentBook?.isbn}
									ref={register({ required: true, minLength: 3, maxLength: 50 })}
									placeholder='ISBN'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-7' 
									type='text' name='article' 
									defaultValue={currentBook?.article}
									ref={register({ required: true, minLength: 3, maxLength: 50 })}
									placeholder='Артикул'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-8' 
									type='text' name='age' 
									defaultValue={currentBook?.age}
									ref={register({ required: true, minLength: 1, maxLength: 50 })}
									placeholder='Возрастное ограничение'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-8' 
									type='text' name='yearOfPublish' 
									defaultValue={currentBook?.yearOfPublish}
									ref={register({ required: true, minLength: 4, maxLength: 50 })}
									placeholder='Год издания'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-9' 
									type='text' name='pages' 
									defaultValue={currentBook?.pages}
									ref={register({ required: true, minLength: 1, maxLength: 50 })}
									placeholder='Количество страниц'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-10' 
									type='text' name='binding' 
									defaultValue={currentBook?.binding}
									ref={register({ required: true, minLength: 3, maxLength: 50 })}
									placeholder='Переплёт'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-11' 
									type='text' name='format' 
									defaultValue={currentBook?.format}
									ref={register({ required: true, minLength: 3, maxLength: 50 })}
									placeholder='Формат'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-12' 
									type='text' name='weight' 
									defaultValue={currentBook?.weight}
									ref={register({ required: true, minLength: 2, maxLength: 50 })}
									placeholder='Вес'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-13' 
									type='text' name='price' 
									defaultValue={currentBook?.price}
									ref={register({ required: true, minLength: 1, maxLength: 50 })}
									placeholder='Цена'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-14' 
									type='text' name='discountPrice' 
									defaultValue={currentBook?.discountPrice}
									ref={register({ minLength: 1, maxLength: 50 })}
									placeholder='Цена по скидке'
								/>
							</div>

							<div className={styles.filed}>
								<input 
									id='upload-input-15' 
									type='text' name='discountPercent' 
									defaultValue={currentBook?.discountPercent}
									ref={register({ minLength: 1, maxLength: 50 })}
									placeholder='Процент скидки'
								/>
							</div>

							<Button text='Добавить' type={ButtonTypesEnum.SUBMIT} />
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