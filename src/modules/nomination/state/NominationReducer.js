import update from 'immutability-helper';
import {
  GET_NOMINATIONS,
  POST_NOMINATION_PAYMENTS,
  PUT_NOMINATION_PAYMENTS,
  NOMINATIONS_LOADED,
  ON_NOMINATION_APPROVAL_CHANGE,
  GET_NOMINATION_PAYMENTS,
  HANDLE_CHANGE_PAYMENT
} from "./NominationTypes";

const initialState = {
  //define the common states only
  all_nominations: [3],
  candidatePayments:[],
  nominations: [],
  getNominationPayments:[],
  paymentState:[]
};

const findIndex = (nominations, id) => {
  return nominations.findIndex(x => x.nomination_id === id);
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOMINATIONS:
      return {
        ...state,
        all_nominations: action.payload
      };
    case POST_NOMINATION_PAYMENTS:
      return {
        ...state,
        candidatePayments: action.payload
      };
    case PUT_NOMINATION_PAYMENTS:
      return {
        ...state,
        candidatePayments: action.payload
      };
    case NOMINATIONS_LOADED:
      return {
        ...state,
        nominations: action.payload
      };
    case ON_NOMINATION_APPROVAL_CHANGE:
      const nominations = state.nominations;
      const index = findIndex(nominations, action.payload.id);
      return {
        ...state,
        nominations: update(nominations, {[index]: {approval_status: {$set: action.payload.status}}})
      }
    case GET_NOMINATION_PAYMENTS:
      return {
        ...state,
        getNominationPayments: action.payload
      };  
    case HANDLE_CHANGE_PAYMENT:
      return {
        ...state,
        paymentState: action.payload
      }; 


  }
  return state;
}

