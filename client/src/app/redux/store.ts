import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import {rootSaga} from "./saga";
import {AuthInterface, reducer as authReducer} from './auth/reducer';
import {FilmUploadInterface, reducer as filmUploadReducer} from './film-upload/reducer';
import {LoadingState ,reducer as loadingReducer} from './loading/reducer';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
	auth: AuthInterface;
	filmUpload: FilmUploadInterface;
	loading: LoadingState;
}

const rootReducers = combineReducers({
	auth: authReducer,
	filmUpload: filmUploadReducer,
	loading: loadingReducer
});

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;