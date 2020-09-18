import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';

import { reducer as authReducer } from '../redux/auth/reducer';
import {rootSaga} from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
  auth: authReducer,
});

export const history = createBrowserHistory();

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;