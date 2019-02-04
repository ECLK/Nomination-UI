import {PAYMENT_LOAD_SUCCESS, PAYMENTS_LOADING, TOGGLE_PAYMENT} from "./PaymentTypes";
import update from 'immutability-helper';
import {REQUEST_STATE} from "../../../lib/request_redux_state";


const initialState = {
    payments: {},
    requestState: REQUEST_STATE.NOT_STARTED
};

function findPaymentIndex(payments, id) {
    return payments.findIndex(x => x.payment_id === id);
}

export default function reducer(state = initialState, action) {
    const allPayments = state.payments;

    switch (action.type) {
        case PAYMENTS_LOADING:
            return {
                ...state,
                requestState: REQUEST_STATE.LOADING
            };
        case PAYMENT_LOAD_SUCCESS:
            Object.entries(action.payload).forEach(entry => {
                allPayments[entry[0]] = entry[1];
            });
            return {
                ...state,
                requestState: REQUEST_STATE.SUCCESS
            };
        case TOGGLE_PAYMENT:
            const {paymentId, electionId} = action.payload;
            const payments = allPayments[electionId];
            const i = findPaymentIndex(payments, paymentId);
            const toggled = payments[i].payment_status === 'paid' ? 'pending' : 'paid';
            const newPayments = update(payments, {[i]: {payment_status: {$set: toggled}}});
            return {
                ...state,
                payments: {...allPayments, [electionId]: newPayments},
            };
    }
    return state;
}

