import {
    POST_ACTIVE_ELECTION_DATA
} from "./ElectionTypes";

const initialState = {
    //define the common states only
    nominationStart: '2017-05-24T10:30',
    nominationEnd:'2017-05-24T10:30',
    objectionStart:'2017-05-24T10:30',
    objectionEnd:'2017-05-24T10:30',
    depositAmount:'Amount',
    WeightagePrefarence:'%',
    WeightageVote:'%',

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case POST_ACTIVE_ELECTION_DATA:
            return {
                ...state,
                modalOpen: action.payload
            };


    }
    return state;
}

