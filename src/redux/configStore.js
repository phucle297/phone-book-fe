import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import LoadingReducer from "./reducers/LoadingReducer";

const rootReducer = combineReducers({ LoadingReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
