import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducer from './reducers/root-reducer';
import thunkMiddleware from 'redux-thunk';

const store = createStore(reducer,
	+ const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	+ const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(createLogger(), thunkMiddleware))
);

export default store;
