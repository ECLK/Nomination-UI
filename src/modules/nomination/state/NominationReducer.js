import {
    GET_NOMINATIONS,
    POST_NOMINATION_PAYMENTS
} from "./NominationTypes";

const initialState = {
    //define the common states only
    all_nominations: [3],
    candidatePayments:[2500]
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOMINATIONS:
            return {
                ...state,
                modalOpen: action.payload
            };
            case POST_NOMINATION_PAYMENTS:
            return {
                ...state,
                modalOpen: action.payload
            };


    }
    return state;
}

