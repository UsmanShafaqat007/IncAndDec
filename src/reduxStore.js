import rootReducer from "./reducers";
// dont have to use / index because it will get index file by default
import { createStore } from "redux";

const store =createStore(rootReducer)

export default store