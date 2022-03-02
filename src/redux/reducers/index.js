/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import { combineReducers } from 'redux';

// Reducers
import sign from './sign';
import order from './order';

export default combineReducers({
    sign,
    order
});