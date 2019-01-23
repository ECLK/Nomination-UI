import { combineReducers } from "redux";

import Nomination from "../modules/nomination/state/NominationReducer.js";
import Payment from "../modules/payment/state/PaymentReducer.js";

export default combineReducers({
    Nomination,
    Payment,
    //other reducers
});
