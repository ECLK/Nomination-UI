import {
    CREATE_ELECTION_MODULE,
    UPDATE_ELECTION_MODULE,
    CLEAR_ELECTION_MODULE,
} from "./ElectionTypes";

const initialState = {
    //define the common states only
    new_election_module: { name: "" }
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
    }
    return state;
}