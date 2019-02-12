import {
    ELECTION_LOAD_SUCCESS,
    ELECTIONS_LOADING, 
    POST_ACTIVE_ELECTION_DATA,
    POST_ELECTION,
    GET_ELECTION_MODULE,
    SET_ELECTION_TIME_LINE
} from "./ElectionTypes";
import {REQUEST_STATE} from "../../../lib/request_redux_state";

const initialState = {
    //define the common states only
    nominationStart: '2017-05-24T10:30',
    nominationEnd:'2017-05-24T10:30',
    objectionStart:'2017-05-24T10:30',
    objectionEnd:'2017-05-24T10:30',
    depositAmount:'Amount',
    WeightagePrefarence:'%',
    WeightageVote:'%',
    requestState: REQUEST_STATE.NOT_STARTED,
    elections:[],
    electionData:[],
    allElectionModules:[],
    electionTimeLine:[]

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case POST_ACTIVE_ELECTION_DATA:
            return {
                ...state,
                modalOpen: action.payload
            };
        case ELECTIONS_LOADING:
            return {
                ...state,
                requestState: REQUEST_STATE.LOADING
            };
        case ELECTION_LOAD_SUCCESS:
            return {
                ...state,
                elections: action.payload,
                requestState: REQUEST_STATE.SUCCESS
            };
        case POST_ELECTION:
            return {
              ...state,
              electionData: action.payload
            };
        case GET_ELECTION_MODULE:
            return {
              ...state,
              allElectionModules: action.payload
            };
        case SET_ELECTION_TIME_LINE:
            return {
              ...state,
              electionTimeLine: action.payload
            };
    }
    return state;
}

