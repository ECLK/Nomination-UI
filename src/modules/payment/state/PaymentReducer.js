import {PAYMENT_LOAD_SUCCESS, PAYMENTS_LOADING, TOGGLE_PAYMENT} from "./PaymentTypes";
import update from 'immutability-helper';
import {REQUEST_STATE} from "../../../lib/request_redux_state";


const initialState = {
    payments: [],
    requestState: REQUEST_STATE.NOT_STARTED
};

function findPaymentIndex(payments, id) {
    return payments.findIndex(x => x.payment_id === id);
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PAYMENTS_LOADING:
            return {
                ...state,
                requestState: REQUEST_STATE.LOADING
            };
        case PAYMENT_LOAD_SUCCESS:
            return {
                ...state,
                payments: action.payload,
                requestState: REQUEST_STATE.SUCCESS
            };
        case TOGGLE_PAYMENT:
            const payments = state.payments;
            const i = findPaymentIndex(payments, action.payload);
            const toggled = payments[i].payment_status === 'paid' ? 'pending' : 'paid';
            return {
                ...state,
                payments: update(payments, {[i]: {payment_status: {$set: toggled}}}),
            };
    }
    return state;
}

