import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import LoadingReducer from "./reducers/LoadingReducer";
import UserReducer from "./reducers/UserReducer";
import CompanyReducer from "./reducers/CompanyReducer";

const rootReducer = combineReducers({
  LoadingReducer,
  UserReducer,
  CompanyReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
