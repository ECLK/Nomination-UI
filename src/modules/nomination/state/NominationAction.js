import {
    GET_NOMINATIONS
} from "./NominationTypes";
import { API_URL } from "../config.js";
import axios from "axios";
// import store from '../store';


export function getNominations() {

    return function (dispatch) {
        const response = axios
            .get(
                `${API_URL}/nominations`
            )
            .then(response => {
                dispatch({
                    type: GET_NOMINATIONS,
                    payload: response.data
                })
            });
    };
}





