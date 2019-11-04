import {createStore,applyMiddleware} from  'redux'
import thunk from 'react-redux'
import reducer from './reducer'
export default createStore(reducer,applyMiddleware(thunk))