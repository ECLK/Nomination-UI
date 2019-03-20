import {loadElections} from "../../election/state/ElectionAction";
import {PAYMENT_LOAD_SUCCESS, PAYMENTS_LOADING, TOGGLE_PAYMENT} from './PaymentTypes'

function paymentsLoadSuccess(payments) {
    return {
        type: PAYMENT_LOAD_SUCCESS,
        payload: payments
    };
}

export function loadPayments(electionId) {

    return function (dispatch) {

        dispatch({
            type: PAYMENTS_LOADING,
            id: electionId
        });

        // return axios.get(
        //     `${API_BASE_URL}/payments/${electionId}`
        // ).then(response => {
        //     dispatch(paymentsLoadSuccess({[electionId]: response}));
        // });

        const payments = {
            [electionId]: [{
                nomination_id: "8ed2e77d-db11-4e69-83a2-3c005ebb3d40",
                payment_id: "2ac00a0a-a442-4288-9cc1-39afcc164b39",
                depositor: "Kamal Silva",
                deposit_id: "LL002",
                deposit_amount: "15000.00",
                deposit_date: "2018-12-25",
                attachment: "attachment",
                payment_status: "pending",
                approved_by:"",
                note: "comment",
            }, {
                nomination_id: "49adf940-3f21-43f0-86e5-a3d8b881a0e6",
                payment_id: "ef27c322-9766-4345-94c0-eb75c12472cd",
                depositor: "Manu Perera",
                deposit_id: "LL003",
                deposit_amount: "13000.00",
                deposit_date: "2018-11-23",
                attachment: "attachment",
                payment_status: "paid",
                approved_by:"Approved By : Kamal Perera (Payment Review Officer)",
                note: "comment",
            }, {
                nomination_id: "49adf940-3f21-43f0-86e5-a3d8b881a066",
                payment_id: "ef27c322-9766-4345-94c0-eb75c124727d",
                depositor: "Nimal Frenando",
                deposit_id: "SB003",
                deposit_amount: "13000.00",
                deposit_date: "2018-11-21",
                attachment: "attachment",
                payment_status: "paid",
                approved_by:"Approved By : Kamal Perera (Payment Review Officer)",
                note: "comment",
            }]
        };

        return new Promise(resolve =>
            setTimeout(resolve, 1000)
        ).then(_ => dispatch(paymentsLoadSuccess(payments)));
    };
}

export function togglePayment(electionId, paymentId) {

    return {
        type: TOGGLE_PAYMENT,
        payload: {electionId, paymentId}
    };
}


