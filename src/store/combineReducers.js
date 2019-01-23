import { combineReducers } from "redux";

import Nomination from "../modules/nomination/state/NominationReducer.js";
import Election from "../modules/election/state/ElectionReducer.js";


export default combineReducers({
    Nomination,
    Election,
    //other reducers
});
