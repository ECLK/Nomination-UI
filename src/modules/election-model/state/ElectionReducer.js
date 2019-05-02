import {
    CREATE_ELECTION_MODULE,
    UPDATE_ELECTION_MODULE,
    CLEAR_ELECTION_MODULE,
    GET_APPROVED_ELECTION_MODULE,
    GET_PENDING_ELECTION_MODULE,
    GET_REJECTED_ELECTION_MODULE
} from "./ElectionTypes";

const initialState = {
    //define the common states only
    RejectedElectionModules:[],
    PendingElectionModules:[],
    ApprovedElectionModules:[],
    new_election_module: { 
        name: "" ,
        // nominationSubmission: [],
        eligibilityCheckList: [],
        candidateFormConfiguration: [],
        supportingDocuments: [],
        divisionConfig:[],   
        electionConfig:[]

    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ELECTION_MODULE:
            return Object.assign({}, state, {
                new_election_module: {
                    ...state.new_election_module,
                    name: action.payload
                }
            });
        case UPDATE_ELECTION_MODULE:
            return {
                ...state,
                new_election_module: action.payload
            };
        case GET_APPROVED_ELECTION_MODULE:
            return {
                ...state,
                ApprovedElectionModules: action.payload
            }; 
        case GET_PENDING_ELECTION_MODULE:
            return {
                ...state,
                PendingElectionModules: action.payload
            }; 
        case GET_REJECTED_ELECTION_MODULE:
            return {
                ...state,
                RejectedElectionModules: action.payload
            };  
    }
    return state;
}
