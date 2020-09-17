import { combineReducers } from "redux";
import authReducers from "./authReducers";
import eventReducers from "./eventReducers";

export default combineReducers({
  auth: authReducers,
  events: eventReducers,
});
