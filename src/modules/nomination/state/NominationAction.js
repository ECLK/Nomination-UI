import {
    GET_NOMINATIONS,
    POST_NOMINATION_PAYMENTS
} from "./NominationTypes";
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";
// import store from '../store';


export const getNominations = function getNominations() {

    return function (dispatch) {
        const response = axios
            .get(
                `${API_BASE_URL}/nominations`
            )
            .then(response => {
                dispatch({
                    type: GET_NOMINATIONS,
                    payload: response.data
                })
            });
    };
}

export const postNominationPayments = function postNominationPayments(body) {

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/nominations/payments`,
                {body}
            )
            .then(response => {
                dispatch({
                    type: POST_NOMINATION_PAYMENTS,
                    payload: response.data
                })
            });
    };
}







