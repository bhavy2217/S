/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable perfectionist/sort-imports */
import { thunk } from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger'
import Reducer from './Reducer'

const rootReducer = combineReducers({ cl: Reducer });

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;


