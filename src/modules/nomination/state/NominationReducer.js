import update from 'immutability-helper';
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
  POST_NOMINATION_SUPPORT_DOC,
  APPROVED_ELECTIONS,
  PARTY_LIST_LOADED
} from "./NominationTypes";

const initialState = {
  //define the common states only
  all_nominations: [3],
  candidatePayments:[],
  nominations: [],
  getNominationPayments:[],
  paymentState:[],
  getNominationCandidates:[],
  getNominationCandidateDeleted:[],
  approveElections:[],
  nominationStatus:[],
  partyList:[]
};

const findIndex = (nominations, id) => {
  return nominations.findIndex(x => x.nomination_id === id);
};

function findApprovalIndex(nominations, id) {
  return nominations.findIndex(x => x.id === id);
}

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
      const index = findApprovalIndex(nominations, action.payload.nominationId);
      return {
        ...state,
        nominations: update(nominations, {[index]: {approval_status: {$set: action.payload.status}}})
      }
    case GET_NOMINATION_PAYMENTS:
      return {
        ...state,
        getNominationPayments: action.payload
      }; 
    case GET_NOMINATION_CANDIDATES:
      return {
        ...state,
        getNominationCandidates: action.payload
      };  
    case DELETE_NOMINATION_CANDIDATE:
      const toDelete = state.getNominationCandidates.findIndex(x => x.id === action.payload.candidateId);
      return {
        ...state,
        getNominationCandidates: update(state.getNominationCandidates, { $splice: [[toDelete, 1]] } )
      };   
    case HANDLE_CHANGE_PAYMENT:
      return {
        ...state,
        paymentState: action.payload
      };
    case POST_NOMINATION_SUPPORT_DOC:
      return {
        ...state,
        postNominationSupportDocs: action.payload
      };   
    case APPROVED_ELECTIONS:
      return {
        ...state,
        approveElections: action.payload
      }; 
    case PARTY_LIST_LOADED:
      return {
        ...state,
        partyList: action.payload
      }; 
      

  }
  return state;
}

