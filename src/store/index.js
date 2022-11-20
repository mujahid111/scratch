/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable eslint-comments/no-unused-disable */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import storage from 'redux-persist/es/storage';
import character from './character';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    version:0
};

const reducer = combineReducers({
    characters: character,
});

const presistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(presistedReducer,
    composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { persistor, store };