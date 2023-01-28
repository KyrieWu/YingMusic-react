import { legacy_createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import handlePlayList from './PlaylistStatus/reduver';
import handleUser from './userStatus/reducer'
import handleSearch from './SearchStatus/resucer'
import handlePlayer from './PlayerStatus/reducer'
// 组合各个模块的reducer
const reducers = combineReducers({
	handlePlayList,
	handleUser,
	handleSearch,
	handlePlayer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

export default store;
