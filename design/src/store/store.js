<<<<<<< HEAD
import {createStore,applyMiddleware} from  'redux'
=======
import {createStore,applyMiddleware} from 'redux'
>>>>>>> fd64050b79a185d78c11b88d78a75e63c81dbe5e
import thunk from 'redux-thunk'
import reducer from './reducer'
export default createStore(reducer,applyMiddleware(thunk))