import { combineReducers } from "redux";
import navBtnReducer from "./NavBtnReducer.js";
import sessionIdReducer from "./SessionIdReducer.js";
import userInfReducer from "./UserInfReducer.js";
import isFetchingTokenReducer from './IsFetchingTokenReducer.js';


const allReducer = combineReducers({
    navBtn: navBtnReducer,
    sessionId: sessionIdReducer,
    userInf: userInfReducer,
    isFetchingToken: isFetchingTokenReducer,
})


export default allReducer;