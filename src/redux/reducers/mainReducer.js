
import { handleActions } from "redux-actions";
import { deleteExpensesList, loader, addExpensesList, addExpensesFor, deleteExpensesFor } from "../actions/actions";

const defaultState = {
  data: [],
  loader: false,
  expensesList: [
    {
      "title": "Trip Udupi",
      "id": "1",
      "expenses": [
        {
          "expense_name": "break fast",
          "expense_by": "user 1",
          "expense_amount": "1000",
          "expense_split":"PERCENT", 
          "expense_for": [
            {
              "name": "user 1",
              "id": "123",
              "share": "40",
              "amount": "400"
            },
            {
              "name": "user 2",
              "id": "124",
              "share": "60",
              "amount": "600"
            }
          ]
        },
        {
          "expense_name": "lunch",
          "expense_by": "user 2",
          "expense_amount": "500",
          "expense_split":"EQUAL", 
          "expense_for": [
            {
              "name": "user 1",
              "id": "123",
              "share": "50",
              "amount": "250"
            },
            {
              "name": "user 2",
              "id": "124",
              "share": "50",
              "amount": "250"
            }
          ]
        },
        {
          "expense_name": "dinner",
          "expense_by": "user 2",
          "expense_amount": "500",
          "expense_split":"EXACT", 
          "expense_for": [
            {
              "name": "user 1",
              "id": "123",
              "share":"",
              "amount": "300",
              "extra": "100"
            },
            {
              "name": "user 2",
              "id": "124",
              "share":"",
              "amount": "200"
            }
          ]
        }
      ],
      "partcipant" : [
        {
          "name": "user 1",
          "id": "123"
        },
        {
          "name": "user 2",
          "id": "124"
        }
      ]
    }
  ]
}
const mainReducer = handleActions({
  [loader]: (state, action) => ({
    ...state,
    loader : action?.payload
  }),
  [addExpensesList]: (state, action) => ({
    ...state,
    expensesList : [...state.expensesList,action?.payload]
  }),
  [deleteExpensesList]: (state, action) => ({
    ...state,
    expensesList: state.expensesList.filter(exp => exp.id !== action.payload)
  }),
  [addExpensesFor]: (state, action) => {
    let x = [...state.expensesList];
    x.filter(e => e.id === action.payload.id)[0].expenses =
      [...x.filter(e => e.id === action.payload.id)[0].expenses, action.payload.data]
    return {
      ...state,
      expensesList: x
    };
  },
  [deleteExpensesFor]: (state, action) => {
    let new_exp = [...state.expensesList];
    let filtered_exp = new_exp.filter(e => e.id === action.payload.id).filter(e => e.expenses = e.expenses.filter(f => f.expense_id !== action.payload.exp_id));
    let final_expList = [...new_exp.filter(e => e.id !== action.payload.id), ...filtered_exp];
    return {
      ...state,
      expensesList: final_expList
    }
  }
}, defaultState);

export default mainReducer;