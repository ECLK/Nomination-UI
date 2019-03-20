import {
    CREATE_ELECTION_MODULE,
} from "./ElectionTypes";

const initialState = {
    PostedElectionModuleData: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ELECTION_MODULE:
            return {
                ...state,
                PostedElectionModuleData: action.payload
            };
    }
    return state;
}