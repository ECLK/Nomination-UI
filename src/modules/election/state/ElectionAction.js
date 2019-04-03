import {
    ELECTION_LOAD_SUCCESS,
    ELECTIONS_LOADING,
    POST_ACTIVE_ELECTION_DATA,
    POST_ELECTION,
    GET_ELECTION_MODULE,
    POST_CALL_ELECTION,
    POST_CALL_ELECTION_DATA,
    SET_CALL_ELECTION_DATA,
    ELECTION_REVIEW_DATA,
    ON_ELECTION_APPROVAL_CHANGE,
    SNACK_BAR_MESSAGE_LOADED,
    GET_APPROVE_ELECTIONS,
    GET_PENDING_ELECTIONS,
    GET_REJECTED_ELECTIONS
} from "./ElectionTypes";
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";

// import store from '../store';


// export function postActiveElections() {

//     return function (dispatch) {
//         const response = axios
//             .post(
//                 `${API_BASE_URL}/activeElections`,
//                 {
//                     firstName: 'Fred',
//                     lastName: 'Flintstone'
//                 }
//             )
//             .then(response => {
//                 dispatch({
//                     type: POST_ACTIVE_ELECTION_DATA,
//                     payload: response.data
//                 })
//             });
//     };
// }

function electionsLoadSuccess(elections) {
    return {
        type: ELECTION_LOAD_SUCCESS,
        payload: elections
    };
}

export function loadElections() {
    return function (dispatch) {
        dispatch({
            type: ELECTIONS_LOADING
        });

        // un comment this and remove below Promise when backend is implemented
        // return axios.get(
        //     `${API_BASE_URL}/elections`
        // ).then(response => {
        //     dispatch(paymentsLoadSuccess(response))
        // });

        const elections = [{
            "election_id": "32d250c8-b6b0-4aa6-9b14-4817dbb268d9",
            "election_name": "2019 Parliamentary",
        }, {
            "election_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
            "election_name": "2020 Provincial",
        }];

        return new Promise(resolve =>
            setTimeout(resolve, 1000)
        ).then(_ => dispatch(electionsLoadSuccess(elections)));

    }
}

export const setElectionData = (val) => {
    return {
        type: POST_ELECTION,
        payload: val
    }
}
export function postElection(elections) {
    return function (dispatch) {

        let electionData = {
            name: elections.electionName,
            module_id: elections.ElectionModule,
            created_by: '234234',
            created_at: '234234',
            updated_at: '234234',
        };


        const response = axios
            .post(
                `${API_BASE_URL}/activeElections`,
                { ...electionData }
            )
            .then(response => {
                console.log("response.data", response.data);
                let res = {
                    election_id: response.data.id,
                    electionName: response.data.name,
                    ElectionModule: response.data.module_id,
                    created_by: response.data.created_by,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at
                }

                dispatch(setElectionData(res));
            }).catch(err => {
                console.log(err)
            });
    };
}


const electionModuleLoaded = (getElectionModules) => {
    return {
        type: GET_ELECTION_MODULE,
        payload: getElectionModules,
    };
};

export function getElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/APPROVE/all`,
            )
            .then(response => {
                const getElectionModules = response.data;
                console.log("getElectionModules", getElectionModules);
                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
            }).catch(err => {
                const getElectionModules = [];
                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
                console.log(err)
            });
    };
}

//Get approve elections
const approveElectionLoaded = (getApproveElections) => {
    return {
        type: GET_APPROVE_ELECTIONS,
        payload: getApproveElections,
    };
};

export function getApproveElections() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/status/APPROVE`,
            )
            .then(response => {
                const getApproveElections = response.data;
                dispatch(
                    approveElectionLoaded(getApproveElections)
                );
            }).catch(err => {
                const getApproveElections = [];
                dispatch(
                    approveElectionLoaded(getApproveElections)
                );
                console.log(err)
            });
    };
}
//Get pending elections
const pendingElectionLoaded = (getPendingElections) => {
    return {
        type: GET_PENDING_ELECTIONS,
        payload: getPendingElections,
    };
};

export function getPendingElections() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/status/PENDING`,
            )
            .then(response => {
                const getPendingElections = response.data;
                dispatch(
                    pendingElectionLoaded(getPendingElections)
                );
            }).catch(err => {
                const getPendingElections = [];
                dispatch(
                    pendingElectionLoaded(getPendingElections)
                );
                console.log(err)
            });
    };
}
//Get rejected elections
const rejectedElectionLoaded = (getRejectedElections) => {
    return {
        type: GET_REJECTED_ELECTIONS,
        payload: getRejectedElections,
    };
};

export function getRejectedElections() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/status/REJECT`,
            )
            .then(response => {
                const getRejectedElections = response.data;
                dispatch(
                    rejectedElectionLoaded(getRejectedElections)
                );
            }).catch(err => {
                const getRejectedElections = [];
                dispatch(
                    rejectedElectionLoaded(getRejectedElections)
                );
                console.log(err)
            });
    };
}

export function setElectionTimeLine(timeLineData) {
    let electionTimeLine = {
        nominationStart: timeLineData.nominationStart,
        nominationEnd: timeLineData.nominationEnd,
        objectionStart: timeLineData.objectionStart,
        objectionEnd: timeLineData.objectionEnd
    }
}

export function setCallElectionData(electionData) {
    let CallElectionData = {

        electionName: electionData.electionName,
        electionModule: electionData.electionModule,
        nominationStart: electionData.nominationStart,
        nominationEnd: electionData.nominationEnd,
        objectionStart: electionData.objectionStart,
        objectionEnd: electionData.objectionEnd,
        depositAmount: electionData.depositAmount,
        WeightagePrefarence: electionData.WeightagePrefarence,
        WeightageVote: electionData.WeightageVote,
        rowData: electionData.rowData,

    };

    return {
        type: SET_CALL_ELECTION_DATA,
        payload: CallElectionData
    };
}

export const setCallElection = (val) => {
    return {
        type: POST_CALL_ELECTION,
        payload: val
    }
}

export function postActiveElections(elections) {
    return function (dispatch) {

        let CallelectionData = {
            name: elections.electionName,
            module_id: elections.ElectionModule,
            created_by: '234234',
            created_at: '234234',
            updated_at: '234234',
        };


        const response = axios
            .post(
                `${API_BASE_URL}/activeElections`,
                { ...CallelectionData }
            )
            .then(response => {
                console.log("response.data", response.data);
                let res = {
                    election_id: response.data.id,
                    electionName: response.data.name,
                    ElectionModule: response.data.module_id,
                    created_by: response.data.created_by,
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at
                }

                dispatch(setCallElection(res));
            }).catch(err => {
                console.log(err)
            });
    };
}

//----------- Start of save Call Election Data ----------------

export const setPostCallElectionData = (val) => {
    return {
        type: POST_CALL_ELECTION,
        payload: val
    }
}


export function postCallElectionData(CallElectionData, electionData) {
    //TODO: yujith, config ids should get from the front end and the array should be dynamic
    let newDate = new Date();
   
    let allElectionData = {
        "name":CallElectionData.electionName,
        "module_id":CallElectionData.electionModule,

        "created_by":"admin",
        "created_at":Date.parse(newDate),
        "updated_at":"234344",
        "timeLineData": 
            {
                nominationStart: Date.parse(CallElectionData.nominationStart),
                nominationEnd: Date.parse(CallElectionData.nominationEnd),
                objectionStart: Date.parse(CallElectionData.objectionStart),
                objectionEnd: Date.parse(CallElectionData.objectionEnd),
                electionId: electionData.election_id,
            }
        ,
        // "confData": [
        //     {
        //         electionConfigId: '1',
        //         value: CallElectionData.depositAmount,
        //         electionId: electionData.election_id,
        //     },
        //     {
        //         electionConfigId: '2',
        //         value: CallElectionData.WeightageVote,
        //         electionId: electionData.election_id,
        //     },
        //     {
        //         electionConfigId: '3',
        //         value: CallElectionData.WeightagePrefarence,
        //         electionId: electionData.election_id,
        //     }

        // ],
        "nominationAllowData": CallElectionData.rowData

    }

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/activeElectionsData`,
                { ...allElectionData }
            )
            .then(response => {
                console.log("response.data", response.data);
                dispatch(setPostCallElectionData(response));
            }).catch(err => {
                console.log(err)
            });
    };
}

// export function saveActiveElectionTimeLine(timeLineData) {
//   return function (dispatch) {
//   const response = axios
//   .post(
//     `${API_BASE_URL}/activeElections/TimeLine`,
//         {...timeLineData}
//   )
//   .then(
//       response => response.json()
//     ).then(
//       json => dispatch({ type: SET_CALL_ELECTION_DATA, payload: json }),
//       err => console.log(err)
//     );
//   };
// }

// export function saveActiveElectionConfig(confData) {
//   return function (dispatch) {
//       const response = axios
//       .post(
//         `${API_BASE_URL}/activeElections/Config`,
//             {...confData}
//       )
//     .then(
//       response => response.json()
//     ).then(
//       json => dispatch({ type: SAVE_ELECTION_CONFIG,  payload: json  }),
//       err => console.log(err)
//     );
//   };
// }

//----------- End of save Call Election Data ----------------



export function getAllElectionReviews() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/status/PENDING`,
            )
            .then(response => {
                const getElectionModules = response.data;

                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
            }).catch(err => {
                const getElectionModules = [];
                dispatch(
                    electionModuleLoaded(getElectionModules)
                );
                console.log(err)
            });
    };
}

//Get data for election approve detail page

export const electionReviewDataLoaded = (val) => {
    return {
        type: ELECTION_REVIEW_DATA,
        payload: val
    }
}
export function getElectionReviewData(id) {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/elections/${id}`,
            )
            .then(response => {
                const getElectionReviewData = response.data;
                dispatch(
                    electionReviewDataLoaded(getElectionReviewData)
                );
            }).catch(err => {
                const getElectionReviewData = [];
                dispatch(
                    electionReviewDataLoaded(getElectionReviewData)
                );
                console.log(err)
            });
    };
}

// change election review status
export const onChangeApprovalData = (electionApprovals) => {
    return {
      type: ON_ELECTION_APPROVAL_CHANGE,
      payload: electionApprovals,
    }
  };
  
  export function onChangeApproval(electionId,status) {
    debugger;
    return function (dispatch) {
      let electionApprovals = {
        updatedAt: Date.parse(new Date()),
        status: status,
        electionId: electionId
      };
      
       
      const response = axios
      .post(
        `${API_BASE_URL}/activeElections/${electionId}/approve-active-election`,
            {...electionApprovals}
      )
      .then(response => {
        console.log("response",response.data);
        debugger;
         dispatch(onChangeApprovalData(response.data));
      }).catch(err => {
            console.log(err)
      });
    };
  }


  export const openSnackbar = ({ message }) => {
     const data = {
        open: true,
        message,
      }
    return {
        type: SNACK_BAR_MESSAGE_LOADED,
        payload: data,
      }
    
  };
  export const handleSnackbarClose = () => {
    const data = {
       open: false,
       message:''
     }
   return {
       type: SNACK_BAR_MESSAGE_LOADED,
       payload: data,
     }
   
 };


