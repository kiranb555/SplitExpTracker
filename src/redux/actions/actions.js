import { createAction } from "redux-actions";

export const getData = createAction("GET_DATA");
export const setData = createAction("SET_DATA");
export const loader = createAction("LOADER");
export const addExpensesList = createAction("ADD_EXPENSES_LIST");
export const deleteExpensesList = createAction("DELETE_EXPENSES_LIST");

export const addExpensesFor = createAction("ADD_EXPENSES_FOR");
export const deleteExpensesFor = createAction("DELETE_EXPENSES_FOR");