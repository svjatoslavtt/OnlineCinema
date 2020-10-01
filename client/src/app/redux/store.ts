import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import {rootSaga} from "./saga";
import {AuthState, reducer as authReducer} from './auth/reducer';
import {FilmUploadState, reducer as filmUploadReducer} from './film-upload/reducer';
import {LoadingState ,reducer as loadingReducer} from './loading/reducer';
import {FilmsState ,reducer as getFilmsReducer} from './get-films/reducer';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
	auth: AuthState;
	filmUpload: FilmUploadState;
	loading: LoadingState;
	getFilms: FilmsState;
}

const rootReducers = combineReducers({
	auth: authReducer,
	filmUpload: filmUploadReducer,
	loading: loadingReducer,
	getFilms: getFilmsReducer,
});

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;