import { combineReducers } from 'redux';
import getDataReducer from './getDataReducer';

const staticReducers = {
    root: getDataReducer,
};

const rootReducer = combineReducers({
    ...staticReducers
});

export default rootReducer;