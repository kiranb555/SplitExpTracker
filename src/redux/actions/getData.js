import { createAction } from 'redux-actions';

export const getData = createAction('GET_DATA');
export const setData = createAction('SET_DATA');
export const loader = createAction("LOADER");