import {
  GET_NOMINATIONS,
  POST_NOMINATION_PAYMENTS,
  NOMINATIONS_LOADED,
  ON_NOMINATION_APPROVAL_CHANGE,
} from "./NominationTypes";
import {API_BASE_URL} from "../../../config.js";
import axios from "axios";
import moment from "react-moment";
// import store from '../store';

const nominationLoaded = (nominations) => {
  return {
    type: NOMINATIONS_LOADED,
    payload: nominations,
  };
};

export const getNominations = function getNominations() {

  return function (dispatch) {
    /*const response = axios
      .get(
        `${API_BASE_URL}/nominations`
      )
      .then(response => {
        dispatch({
          type: GET_NOMINATIONS,
          payload: response.data
        })
      });*/
    const nominations = [{
      nomination_id: "21539ee7-7220-4570-8973-099aff3f7423",
      district: "colombo",
      party: "Party 1",
      candidates: [{
        nic: "852784826v",
        name_in_sinhala: "Some name in sinhala",
        name_in_english: "Some name in english",
        name_in_tamil: "திஸ் ஐஸ் மீ நமே",
        occupation: "doctor",
        address: "Colombo 07"
      }, {
        nic: "431235234V",
        name_in_sinhala: "මුදියන්සේ අප්පුහාමිලාගේ උක්කුං",
        name_in_english: "Mudiyanse Appuhamilage Ukkun",
        name_in_tamil: "திஸ் ஐஸ் மீ நமே",
        occupation: "bus conductor",
        address: "Colombo 12"
      }],
      payment_status: "paid",
      approval_status: "approved",
      objection_status: "verified",
    }, {
      nomination_id: "1fd1fdef-e77e-43c4-bf7f-334274c1a5fb",
      district: "gampaha",
      party: "Some other party",
      candidates: [{
        nic: "2131435245",
        name_in_sinhala: "Some name in sinhala",
        name_in_english: "Some name in english",
        name_in_tamil: "திஸ் ஐஸ் மீ நமே",
        occupation: "-",
        address: "Somewhere in Gampaha"
      }, {
        nic: "874263423V",
        name_in_sinhala: "Some name in sinhala",
        name_in_english: "Some name in english",
        name_in_tamil: "திஸ் ஐஸ் மீ நமே",
        occupation: "-",
        address: "Anuradhapura new town"
      }, {
        nic: "676545632C",
        name_in_sinhala: "Some name in sinhala",
        name_in_english: "Some name in english",
        name_in_tamil: "திஸ் ஐஸ் மீ நமே",
        occupation: "doctor",
        address: "Never been in Gampaha"
      }],
      payment_status: "pending",
      approval_status: "reject",
      objection_status: "pending",
    }];

    setTimeout(()=>{
      dispatch(nominationLoaded(nominations));
    }, 1000);
  };
}

// export const getNominations = function getNominations() {
//   return function (dispatch) {
//     const response = axios
//       .post(
//         `${API_BASE_URL}/nominations/payments`,
//         {body}
//       )
//       .then(response => {
//         dispatch({
//           type: POST_NOMINATION_PAYMENTS,
//           payload: response.data
//         })
//       });
//   };
// }

export const onChangeApproval = (id, status) => {
  return {
    type: ON_NOMINATION_APPROVAL_CHANGE,
    payload: {id, status},
  }
};

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










