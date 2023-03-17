import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { courseReducer } from './reducers/courseReducer';
//import courseReducer from './features/courseReducer';

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({ 
    user: userReducer,
    course: courseReducer
  })
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer:  persistedReducer,
    
    middleware: [thunk]
})
export const persistor = persistStore(store)