import {
    POST_ACTIVE_ELECTION_DATA
} from "./ElectionTypes";
import { API_URL } from "../config.js";
import axios from "axios";
// import store from '../store';


export function postActiveElections() {

    return function (dispatch) {
        const response = axios
            .post(
                `${API_URL}/activeElections`,
                data, {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                  }
            )
            .then(response => {
                dispatch({
                    type: POST_ACTIVE_ELECTION_DATA,
                    payload: response.data
                })
            });
    };
}





