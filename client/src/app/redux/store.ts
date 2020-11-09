import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import {rootSaga} from "./saga";
import {AuthState, reducer as authReducer} from './auth/reducer';
import {FilmUploadState, reducer as filmUploadReducer} from './book-upload/reducer';
import {LoadingState, reducer as loadingReducer} from './loading/reducer';
import {reducer as getFilmsReducer} from './books/reducer';
import {reducer as getUserProfileReducer} from './user-profile/reducer';
import {reducer as getFilterReducer} from './filter/reducer';
import { FilmsState } from './books/types';
import { UserProfileTypes } from './user-profile/reducer';
import { FilterTypes } from './filter/reducer';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
	auth: AuthState;
	filmUpload: FilmUploadState;
	loading: LoadingState;
	getFilms: FilmsState;
	userProfile: UserProfileTypes;
	filter: FilterTypes;
}

const rootReducers = combineReducers({
	auth: authReducer,
	filmUpload: filmUploadReducer,
	loading: loadingReducer,
	getFilms: getFilmsReducer,
	userProfile: getUserProfileReducer,
	filter: getFilterReducer,
});

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;