import {
    GET_NOMINATIONS,
    POST_NOMINATION_PAYMENTS,
    ERROR,
    AUTH_FAILED

} from "./NominationTypes";
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";
import moment from "react-moment";
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


export const setData = (val) => {
    return {
        type: POST_NOMINATION_PAYMENTS,
        payload: val
    }
}



export function postNominationPayments(candidatePayments) {
    return function (dispatch) {

        let nominationPayments = {
            depositor: candidatePayments.depositor,
            amount: candidatePayments.depositAmount,
            depositDate: candidatePayments.depositeDate,
            filePath: candidatePayments.filePath,
            status: candidatePayments.status,
            nominationId: candidatePayments.nominationId
        };
        console.log(candidatePayments);
       
      const response = axios
      .post(
        `${API_BASE_URL}/nominations/payments`,
            {...nominationPayments}
      )
      .then(response => {
        console.log(response.data);
        var d = new Date(response.data.depositDate);
        var theyear = d.getFullYear();
        var themonth = d.getMonth() + 1;
        var thetoday = d.getDate();
        var newDate = (theyear + "-" + themonth + "-" + thetoday);

       let res = {
        depositor: response.data.depositor,
        amount: response.data.amount,
        depositDate: newDate,
        filePath: response.data.filePath,
        status: response.data.status,
        nominationId: response.data.nominationId
       }
       console.log("++++++++++++++++",res);

       debugger;
         dispatch(setData(res));
      }).catch(err => {
            console.log(err)
      });
    };
  }

/* export const postNominationPayments = candidatePayments => {

// export const postNominationPayments = function postNominationPayments(candidatePayments, dispatch) {
    let nominationPayments = {
        depositor: candidatePayments.depositor,
        amount: candidatePayments.depositAmount,
        depositDate: candidatePayments.depositeDate,
        filePath: candidatePayments.filePath,
        status: candidatePayments.status,
        nominationId: candidatePayments.nominationId
    };

    console.log("outside");

     return function (dispatch) {


    // return  dispatch => {
    console.log("inside", nominationPayments);
    // debugger;
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    axios
        .post(
            `${API_BASE_URL}/nominations/payments`,
            nominationPayments
            , { headers: headers }
        )
        .then(response => {
            console.log("))))))))))))", response);
            // dispatch({
                setTimeout(() => {
                    dispatch(setData(response.data));
                }, 3000)
                
            // })
        })
        .catch(error => {
            console.log("===", error);
            // dispatch({ type: AUTH_FAILED });
            // dispatch({ type: ERROR, payload: error.data.error.message });
        });
    // }

//  };
}

*/










