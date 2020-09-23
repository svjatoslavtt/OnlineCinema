import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import {AuthInterface, reducer as authReducer} from '../redux/auth/reducer';
import {rootSaga} from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  auth: AuthInterface;
}

const rootReducers = combineReducers({
  auth: authReducer,
});

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;