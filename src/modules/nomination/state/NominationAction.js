import {
  GET_NOMINATIONS,
  POST_NOMINATION_PAYMENTS,
  PUT_NOMINATION_PAYMENTS,
  NOMINATIONS_LOADED,
  ON_NOMINATION_APPROVAL_CHANGE,
  GET_NOMINATION_PAYMENTS,
  HANDLE_CHANGE_PAYMENT,
  GET_NOMINATION_CANDIDATES,
  DELETE_NOMINATION_CANDIDATE,
  UPDATE_NOMINATION_PAYMENTS

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
      district: "Colombo",
      party: "United National Party ( UNP )",
      candidates: [{
        nic: "912970350V",
        name_in_sinhala: "නිමල් පෙරේරා",
        name_in_english: "Nimal Perera",
        name_in_tamil: "திஸ் ஐஸ் மீ நமே",
        occupation: "doctor",
        address: "Colombo 07"
      }, {
        nic: "823467970V",
        name_in_sinhala: "චමල් දිසානායක​",
        name_in_english: "Chamal Disanayake",
        name_in_tamil: "திஸ் ஐஸ் மீ நமே",
        occupation: "Lowyer",
        address: "Colombo 12"
      }],
      payment_status: "paid",
      approval_status: "approved",
      objection_status: "verified",
    }, {
      nomination_id: "1fd1fdef-e77e-43c4-bf7f-334274c1a5fb",
      district: "Gampaha",
      party: "United People's Freedom Alliance ( UPFA )",
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
    },
    {
      nomination_id: "1fd1fdef-e77e-43c4-bf7f-334274c1a5fb",
      district: "Kalutara",
      party: "Janatha Vimukthi Peramuna ( JVP )",
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
    },
    {
      nomination_id: "1fd1fdef-e77e-43c4-bf7f-334274c1a5fb",
      district: "Gampaha",
      party: "United National Party ( UNP )",
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

const nominationPaymentLoaded = (getNominationPayments) => {
  return {
    type: GET_NOMINATION_PAYMENTS,
    payload: getNominationPayments,
  };
};

export function getNominationPayments(customProps) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${customProps}/payments`,
    )
    .then(response => {
      const getNominationPayments = response.data;
       dispatch(nominationPaymentLoaded(getNominationPayments));
    }).catch(err => {
          console.log(err)
    });
  };
}

const nominationCandidateLoaded = (getNominationCandidates) => {
  return {
    type: GET_NOMINATION_CANDIDATES,
    payload: getNominationCandidates,
  };
};

export function getNominationCandidates(customProps) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${customProps}/candidates`,
    )
    .then(response => {
      const getNominationCandidates = response.data;
       dispatch(
         nominationCandidateLoaded(getNominationCandidates)
         );
    }).catch(err => {
      const getNominationCandidates = [];
      dispatch(
        nominationCandidateLoaded(getNominationCandidates)
        );
          console.log(err)
    });
  };
}

export const onChangeApproval = (id, status) => {
  return {
    type: ON_NOMINATION_APPROVAL_CHANGE,
    payload: {id, status},
  }
};

// export const handleChangePayment = (paymentState) => {
//   debugger;
//   return {
//     type: HANDLE_CHANGE_PAYMENT,
//     payload: paymentState,
//   }
// };


export const handleChangePayment = (name) => event => {
  this.setState({
    [name]:event.target.value,
}); 
let paymentState = this.state;
return {
  type: HANDLE_CHANGE_PAYMENT,
  payload: paymentState,
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
            depositDate: Date.parse(candidatePayments.depositeDate),
            filePath: candidatePayments.filePath,
            status: candidatePayments.status,
            createdBy:candidatePayments.depositor,//TODO: yujith,change this to session user after session user created
            createdAt:Date.parse(new Date()),
            updatedAt:Date.parse(new Date()),
            nominationId: candidatePayments.nominationId
        };
       
      const response = axios
      .post(
        `${API_BASE_URL}/nominations/payments`,
            {...nominationPayments}
      )
      .then(response => {
         dispatch(setData(response.data));
      }).catch(err => {
            console.log(err)
      });
    };
  }

  export const setUpdatedPaymentData = (val) => {
    return {
        type: PUT_NOMINATION_PAYMENTS,
        payload: val
    }
}

  export function updateNominationPayments(customProps,candidatePayments) {
    return function (dispatch) {
      
      let nominationPayments = {
        depositor: candidatePayments.depositor,
        amount: candidatePayments.depositAmount,
        depositDate:Date.parse(candidatePayments.depositeDate),
        filePath: candidatePayments.filePath,
        status: candidatePayments.status,
        updatedAt:Date.parse(new Date()),
        nominationId: candidatePayments.nominationId
    };
      const response = axios
      .put(
        `${API_BASE_URL}/nominations/${customProps}/payments`,
        {...nominationPayments}
      )
      .then(response => {
        const updateNominationPayments = response.data;
         dispatch(setUpdatedPaymentData(updateNominationPayments));
      }).catch(err => {
            console.log(err)
      });
    };
  }

//--------------- Start of Delete Nomination Candidate -------------
export const setDeleteData = (getNominationCandidateDeleted) => {
  return {
      type: DELETE_NOMINATION_CANDIDATE,
      payload: getNominationCandidateDeleted
  }
}

export function deleteNominationCandidate(customProps) {
    return function (dispatch) {
       
      const response = axios
      .delete(
        `${API_BASE_URL}/nominations/${customProps}/candidates`,
      )
      .then(response => {
        const getNominationCandidateDeleted = response.data;
         dispatch(
          setDeleteData(getNominationCandidateDeleted)
           );
      }).catch(err => {
        const getNominationCandidateDeleted = [];
        dispatch(
          setDeleteData(getNominationCandidateDeleted)
          );
            console.log(err)
      });
    };
  }
//--------------- End of Delete Nomination Candidate -------------











