import { legacy_createStore, combineReducers, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'


// 组合各个模块的reducer
const reducers = combineReducers({})


let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))

export default store