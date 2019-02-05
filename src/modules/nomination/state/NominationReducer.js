import {
    GET_NOMINATIONS,
    POST_NOMINATION_PAYMENTS,
    ERROR,
    AUTH_FAILED
} from "./NominationTypes";

const initialState = {
    //define the common states only
    all_nominations: [],
    nominationPayments:{
    },
    
};

export default function reducer(state = initialState, action) {
    // debugger;
    switch (action.type) {
        case GET_NOMINATIONS:
        return {
            ...state,
            all_nominations: action.payload
        };
        case POST_NOMINATION_PAYMENTS:
            return {
                ...state,
                nominationPayments: action.payload
            };
        case AUTH_FAILED:
            return {
                ...state,
                nominationPayments: action.payload
            };  
        case ERROR:
            return {
                ...state,
                nominationPayments: action.payload
            };  
      

    }
    return state;
}

