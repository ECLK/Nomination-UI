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
  UPDATE_NOMINATION_PAYMENTS,
  POST_NOMINATION_SUPPORT_DOC,
  APPROVED_ELECTIONS,
  PARTY_LIST_LOADED,
  GET_NOMINATION_LIST,
  RECEIVE_NOMINATION_STATUS,
  POST_CANDIDATE_SUPPORT_DOC,
  CANDIDATE_SUPPORT_DOC_LOADED,
  NOMINATION_PAYMENT_STATUS_LOADED,
  PAYMENT_LIST_LOADED,
  PAYMENT_SERIAL_NO_LOADED,
  GET_NOMINATION_LIST_FOR_PAYMENT,
  GET_NOMINATION_DATA,
  NOMINATION_PAYMENT_VALIDATION_LOADED,
  ORIGINAL_UPLOAD_PATH_LOADED
} from "./NominationTypes";
import {API_BASE_URL,PDF_GENARATION_SERVICE_URL} from "../../../config.js";
import axios from "axios";
import { openSnackbar } from '../../election/state/ElectionAction';
import moment from "react-moment";
import {saveAs} from 'file-saver';
import { de } from "date-fns/locale";

const nominationLoaded = (getNominations) => {
  return {
    type: NOMINATIONS_LOADED,
    payload: getNominations,
  };
};

export function getNominations(selectedElection,selectedParty) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${selectedElection}/pending-nominations/${'SUBMIT'}/team/${selectedParty}`,
    )
    .then(response => {
       dispatch(nominationLoaded(response.data));
    }).catch(err => {
          console.log(err)
    });
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
      debugger;
       dispatch(nominationPaymentLoaded(getNominationPayments));
    }).catch(err => {
          console.log(err)
    });
  };
}

const approveElectionLoaded = (approveElections) => {
  return {
    type: APPROVED_ELECTIONS,
    payload: approveElections,
  };
};

export function getApproveElections() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/elections/status/${'APPROVE'}`,
    )
    .then(response => {
      const approveElections = response.data;
       dispatch(approveElectionLoaded(approveElections));
    }).catch(err => {
          console.log(err)
    });
  };
}

//get party list for nomination review
const partyListLoaded = (partyList) => {
  return {
    type: PARTY_LIST_LOADED,
    payload: partyList,
  };
};

export function getTeams() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/teams`,
    )
    .then(response => {
      const partyList = response.data;
       dispatch(partyListLoaded(partyList));
    }).catch(err => {
      debugger;
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

export const onChangeApprovalData = (nominationApprovals) => {
  return {
    type: ON_NOMINATION_APPROVAL_CHANGE,
    payload: nominationApprovals,
  }
};

export function onChangeApproval(nominations,id,status,reviewNote) {
  return function (dispatch) {
    let nominationApprovals = {
      createdBy: 'admin',//TODO: yujith, change this to session user after creating the session
      createdAt: Date.parse(new Date()),
      updatedAt: Date.parse(new Date()),
      status: status,
      reviewNote:reviewNote,
      nominationId: id
    };
    const index = nominations.findIndex(x => x.id === id);
    const division = nominations[index].division_name;
    const party = nominations[index].party;

    const response = axios
    .post(
      `${API_BASE_URL}/nominations/${id}/approve-nomination`,
          {...nominationApprovals}
    )
    .then(response => {
       dispatch(onChangeApprovalData(response.data));
       dispatch(openSnackbar({ message:(status === '1ST-APPROVE') ? 'Approved nomination for '+party+' '+ division+' division' : 'Rejected nomination for '+party+' '+ division+' division'}));
    }).catch(err => {
          console.log(err)
    });
  };
}

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

export function postNominationPayments(candidatePayments,serialNo,division,party) {
  debugger;
    return function (dispatch) {

        let nominationPayments = {
            depositor: candidatePayments.depositor,
            amount: candidatePayments.depositAmount,
            serialNo:serialNo,
            depositDate: Date.parse(candidatePayments.depositeDate),
            filePath: 'upload',
            status: "APPROVE",
            createdBy:candidatePayments.depositor,//TODO: yujith,change this to session user after session user created
            createdAt:Date.parse(new Date()),
            updatedAt:Date.parse(new Date()),
            nominationId: candidatePayments.nomination
        };
      const response = axios
      .post(
        `${API_BASE_URL}/nominations/payments`,
            {...nominationPayments}
      )
      .then(response => {
        const newPayment = {
          action:true,
          deposit_amount:response.data.amount,
          deposit_date:candidatePayments.depositeDate,
          depositor:response.data.depositor,
          division:division,
          nomination_id:response.data.nominationId,
          payment_id:response.data.id,
          serial:response.data.serialNo,
          team_id:party
        }
         dispatch(setData(newPayment));
         dispatch(openSnackbar({ message:`Payment has been submitted for ${candidatePayments.division} by ${candidatePayments.partyName}`}));
      }).catch(err => {
            console.log(err)
      });
    };
  }

  export const setSupportDocData = (val) => {
    return {
        type: POST_NOMINATION_SUPPORT_DOC,
        payload: val
    }
}
export const setNominationStatus = (nominationSuppertDocs) => {
  return {
      type: RECEIVE_NOMINATION_STATUS,
      payload: nominationSuppertDocs
  }
}


  export function postNominationSupportDocs(nominationSuppertDocs,divisionId) {
    var nominationSuppertDocs = {
      nominationId:nominationSuppertDocs.nominationId,
      candidateSupportDocs:nominationSuppertDocs.supportdoc,
      divisionId:divisionId
    }
    return function (dispatch) {
       
      const response = axios
      .put(
        `${API_BASE_URL}/nominations/${nominationSuppertDocs.nominationId}/support-docs`,
            {...nominationSuppertDocs}
      )
      .then(response => {
         dispatch(setSupportDocData(response.data));
      }).catch(err => {
            console.log(err)
      });
    };
  }

  export function updateNominationStatus(nominationSuppertDocs,divisionId) {
    var nominationSuppertDocs = {
      nominationId:nominationSuppertDocs.nominationId,
      candidateSupportDocs:nominationSuppertDocs.supportdoc,
      divisionId:divisionId
    }
     return function (dispatch) {
        
       const response = axios
       .put(
         `${API_BASE_URL}/nominations/${nominationSuppertDocs.nominationId}/update-nomination-status`,
       )
       .then(response => {
          dispatch(setNominationStatus(nominationSuppertDocs));
         debugger;
       }).catch(err => {
             console.log(err)
       });
     };
   }

  export const setCandidateSupportDocData = (val) => {
    return {
        type: POST_CANDIDATE_SUPPORT_DOC,
        payload: val
    }
}
  export function postCandidateSupportDocs(candidateSuppertDocs) {
    debugger;
     
     return function (dispatch) {
        
       const response = axios
       .post(
         `${API_BASE_URL}/nominations/candidate/support-docs`,
             {...candidateSuppertDocs}
       )
       .then(response => {
          dispatch(setCandidateSupportDocData(response.data));
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

  export function updateNominationPayments(paymentId,nominationPayments,partyName,nominationName) {
    debugger;
    return function (dispatch) {
          
      let nominationPayment = {
          depositor: nominationPayments.depositor,
          amount: nominationPayments.depositAmount,
          serialNo:nominationPayments.serialNo,
          depositDate: Date.parse(nominationPayments.depositeDate),
          filePath: 'upload',
          status: "APPROVE",
          updatedAt:Date.parse(new Date()),
          nominationId: nominationPayments.nomination,
          note:nominationPayments.note
      };
      const response = axios
      .put(
        `${API_BASE_URL}/nominations/${paymentId}/payments`,
        {...nominationPayment}
      )
      .then(response => {
        const updateNominationPayments = {
          action:true,
          deposit_amount:response.data.amount,
          deposit_date:nominationPayments.depositeDate,
          depositor:response.data.depositor,
          division:nominationName,
          nomination_id:nominationPayments.nomination,
          payment_id:response.data.paymentId,
          serial:nominationPayments.serialNo,
          team_id:nominationPayments.party
        }
        debugger;
         dispatch(setUpdatedPaymentData(updateNominationPayments));
         dispatch(openSnackbar({ message:`Payment has been updated for ${nominationName} by ${partyName}`}));
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

//--------------- Start of get nomination list -------------------
const nominationListLoaded = (getNominationList) => {
  return {
    type: GET_NOMINATION_LIST,
    payload: getNominationList,
  };
};

export function getNominationList() {

  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/elections/${sessionStorage.getItem('election_id')}/teams/${sessionStorage.getItem('party_id')}/divisions`,
    )
    .then(response => {
      const getNominationList = response.data;
       dispatch(
         nominationListLoaded(getNominationList)
         );
    }).catch(err => {
      const getNominationList = [];
      dispatch(
        nominationListLoaded(getNominationList)
        );
          console.log(err)
    });
  };
}

//--------------- End of get nomination list---------------------------

//--------------- Start of get nomination data by nomination id -------------------
const nominationDataLoaded = (getNominationData) => {
  return {
    type: GET_NOMINATION_DATA,
    payload: getNominationData,
  };
};

export function getNominationData(nominationId,keyName) {
debugger;
  return function (dispatch) {
    //change this keyName to candidate payment ig to get the ig candidate payment
   

    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${nominationId}/key-name/${keyName}`,

    )
    .then(response => {
      const getNominationData = response.data;
       dispatch(
        nominationDataLoaded(getNominationData)
         );
    }).catch(err => {
      const getNominationData = [];
      dispatch(
        nominationDataLoaded(getNominationData)
        );
          console.log(err)
    });
  };
}

//--------------- End of get nomination data by nomination id ---------------------------

//--------------- Start of get nomination list for nomination payment-------------------
const nominationListforPaymentLoaded = (getNominationList) => {
  return {
    type: GET_NOMINATION_LIST_FOR_PAYMENT,
    payload: getNominationList,
  };
};

export function getNominationListForPayment(electionId,teamId) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/elections/${electionId}/teams/${teamId}/nominations`,
    )
    .then(response => {
      const getNominationList = response.data;
       dispatch(
        nominationListforPaymentLoaded(getNominationList)
         );
    }).catch(err => {
      const getNominationList = [];
      dispatch(
        nominationListforPaymentLoaded(getNominationList)
        );
          console.log(err)
    });
  };
}

//--------------- End of get nomination list for nomination payment---------------------------

//--------------- Start of get nomination candidate support doc list -------------------
const candidateSupportdocLoaded = (getcandidateSupportdocList) => {
  return {
    type: CANDIDATE_SUPPORT_DOC_LOADED,
    payload: getcandidateSupportdocList,
  };
};

export function getCandidateSupportingDocs(candidateId) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${candidateId}/candidate/support-docs`,
    )
    .then(response => {
      const getcandidateSupportdocList = response.data;
       dispatch(
        candidateSupportdocLoaded(getcandidateSupportdocList)
         );
    }).catch(err => {
      const getcandidateSupportdocList = [];
      dispatch(
        candidateSupportdocLoaded(getcandidateSupportdocList)
        );
          console.log(err)
    });
  };
}

//--------------- End of get nomination candidate support doc list---------------------------

//--------------- Start of get nomination security deposit status -------------------
const nominationPaymentStatusLoaded = (paymentStatus) => {
  return {
    type: NOMINATION_PAYMENT_STATUS_LOADED,
    payload: paymentStatus,
  };
};

export function getNominationStatus(electionId) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nominations/${electionId}/payment-status`,
    )
    .then(response => {
      const paymentStatus = response.data;
       dispatch(
        nominationPaymentStatusLoaded(paymentStatus)
         );
    }).catch(err => {
      const paymentStatus = {};
      dispatch(
        nominationPaymentStatusLoaded(paymentStatus)
        );
          console.log(err)
    });
  };
}

//--------------- End of get nomination security deposit status ---------------------------


//--------------- Start of get security deposit details ---------------------------

const paymentListLoaded = (paymentList) => {
  return {
    type: PAYMENT_LIST_LOADED,
    payload: paymentList,
  };
};

export function getPaymentList() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/nomination-payments`,
    )
    .then(response => {
      const paymentList = response.data;
      debugger;
       dispatch(paymentListLoaded(paymentList));
    }).catch(err => {
      debugger;
      const paymentList = [];
      dispatch(paymentListLoaded(paymentList));
          console.log(err)
    });
  };
}

const paymentSerialLoaded = (paymentSerial) => {
  return {
    type: PAYMENT_SERIAL_NO_LOADED,
    payload: paymentSerial,
  };
};

export function getNominationPaymentSerialNumber() {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/payment-serial`,
    )
    .then(response => {
      const paymentSerial = response.data;
      debugger;
       dispatch(paymentSerialLoaded(paymentSerial));
    }).catch(err => {
      debugger;
      const paymentSerial = '';
      dispatch(paymentSerialLoaded(paymentSerial));
          console.log(err)
    });
  };
}

const nominationPaymentValidationLoaded = (nominationValidation) => {
  return {
    type: NOMINATION_PAYMENT_VALIDATION_LOADED,
    payload: nominationValidation,
  };
};

export function validateNominationPayment(nominationId) {
  debugger;
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/payments/${nominationId}/validate`,
    )
    .then(response => {
      const nominationValidation = response.data;
      debugger;
       dispatch(nominationPaymentValidationLoaded(nominationValidation));
    }).catch(err => {
      debugger;
      const nominationValidation = false;
      dispatch(nominationPaymentValidationLoaded(nominationValidation));
          console.log(err)
    });
  };
}

//--------------- End of get security deposit details ---------------------------

//--------------- Start of genarate pdf ---------------------------
const firstAPI = axios.create({
  baseURL: PDF_GENARATION_SERVICE_URL
})
export const createAndDownloadPdf = function createAndDownloadPdf(paymentData) {
  firstAPI.post(`/create-pdf`,paymentData)
    .then(()=> firstAPI.get('fetch-pdf', { responseType: 'blob'}))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type:'application/pdf' });
      saveAs(pdfBlob,'nomination_payslip.pdf');
    })
}
//--------------- End of genarate pdf ---------------------------
export const createAndDownloadPdfNominationForm = function createAndDownloadPdfNominationForm(type,Data,partyList) {
  var partyName="";
  for (var j = 0; j < partyList.length; j++) {
    if(sessionStorage.getItem("party_id")===partyList[j].team_id){
      partyName=partyList[j].team_name;
    }
}
  debugger;
  var candidateName="";
  var address="";
  var occupation="";
  if(type==="presidential"){
    Data.map((data) => {
      candidateName=data.fullName
      address=data.address
      occupation=data.occupation
    });
  }
  const NominationData = {
    candidateName:candidateName,
    address:address,
    occupation:occupation,
    partyName:partyName
  }
debugger;
  firstAPI.post(`/create-pdf/${type}`,NominationData)
    .then(()=> firstAPI.get('fetch-pdf-presidential', { responseType: 'blob'}))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type:'application/pdf' });
      saveAs(pdfBlob,'form_of_nomination.pdf');
    })
}

const uploadePathLoaded = (OriginalPath) => {
  return {
    type: ORIGINAL_UPLOAD_PATH_LOADED,
    payload: OriginalPath,
  };
};

export function getUploadPath(sid) {
  return function (dispatch) {
     
    const response = axios
    .get(
      `${API_BASE_URL}/file-download/${sid}`,
    )
    .then(response => {
      const OriginalPath = response.data;
      debugger;
       dispatch(uploadePathLoaded(OriginalPath));
    }).catch(err => {
      debugger;
      const OriginalPath = '';
      dispatch(uploadePathLoaded(OriginalPath));
          console.log(err)
    });
  };
}