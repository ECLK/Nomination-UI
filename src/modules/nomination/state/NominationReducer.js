import {
    GET_NOMINATIONS
} from "./NominationTypes";

const initialState = {
    //define the common states only
    modalOpen: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOMINATIONS:
            return {
                ...state,
                modalOpen: action.payload
            };


    }
    return state;
}

