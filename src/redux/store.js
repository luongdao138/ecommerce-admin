import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initState) => {
  const store = createStore(
    rootReducer,
    initState,
    enhancer(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
