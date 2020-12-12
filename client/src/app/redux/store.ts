import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import {rootSaga} from "./saga";
import {AuthState, reducer as authReducer} from './auth/reducer';
import {BookUploadState, reducer as bookUploadReducer} from './book-upload/reducer';
import {LoadingState, reducer as loadingReducer} from './loading/reducer';
import {reducer as getBooksReducer} from './books/reducer';
import {reducer as getUserProfileReducer} from './user-profile/reducer';
import {reducer as getFilterReducer} from './filter/reducer';
import { BooksState } from './books/types';
import { UserProfileTypes } from './user-profile/reducer';
import { FilterTypes } from './filter/reducer';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
	auth: AuthState;
	bookUpload: BookUploadState;
	loading: LoadingState;
	getBooks: BooksState;
	userProfile: UserProfileTypes;
	filter: FilterTypes;
}

const rootReducers = combineReducers({
	auth: authReducer,
	bookUpload: bookUploadReducer,
	loading: loadingReducer,
	getBooks: getBooksReducer,
	userProfile: getUserProfileReducer,
	filter: getFilterReducer,
});

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;