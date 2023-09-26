import { configureStore ,combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { infoReducer } from "./reducers/infoReducer";

const reducer = combineReducers({
    info : infoReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;
