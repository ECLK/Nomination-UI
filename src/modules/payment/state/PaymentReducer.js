import {PAYMENT_LOAD_SUCCESS, TOGGLE_PAYMENT} from "./PaymentTypes";
import update from 'immutability-helper';

const initialState = {
    payments: []
};

function findPaymentIndex(payments, id) {
    return payments.findIndex(x => x.payment_id === id);
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case PAYMENT_LOAD_SUCCESS:
            return {
                ...state,
                payments: action.payload
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

