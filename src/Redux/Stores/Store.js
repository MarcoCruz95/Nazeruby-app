import { legacy_createStore as createStore } from "redux";
import allReducer from '../Reducers/AllReducer.js'


const store = createStore(allReducer);

export default store;