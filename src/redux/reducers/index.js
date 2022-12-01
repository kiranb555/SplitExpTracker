import { combineReducers } from "redux";
import mainReducer from "./mainReducer";

const staticReducers = {
  root: mainReducer,
};

const rootReducer = combineReducers({
  ...staticReducers
});

export default rootReducer;