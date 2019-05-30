import {
    CREATE_ELECTION_MODULE,
    UPDATE_ELECTION_MODULE,
    SAVE_ELECTION_MODULE,
    GET_APPROVED_ELECTION_MODULE,
    GET_PENDING_ELECTION_MODULE,
    GET_REJECTED_ELECTION_MODULE,
    GET_ELECTION_TEMPLATE_DATA,
    GET_DELETED_ELECTION_MODULE
} from "./ElectionTypes";
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";
import { openSnackbar } from '../../election/state/ElectionAction';

//----------- Start of save Call Election Data ----------------

export const setPostModuleData = (val) => {
    return {
        type: CREATE_ELECTION_MODULE,
        payload: val
    }
}

export function postCallElectionData(electionData) {
    //TODO: config ids should get from the front end and the array should be dynamic

    let allElectionModuleData = {
        "moduleId": "1268362183761283718236",
        "divisionCommonName":'Provintial',
        "createdBy":'admin',
        "createdAt":'',
        "updatedAt":'',
        "candidateFormConfiguration": [
            {
                candidateConfigId: '1',
            },
            {
                candidateConfigId: '2',
            },
            {
                candidateConfigId: '3',
            },
            {
                candidateConfigId: '4',
            },
        ],
        "supportingDocuments": [
            {
                supportDocConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            },
            {
                supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            },
            {
                supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            }
        ],
        "divisionConfig":[
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            }
        ],
    "electionConfig": [
        {
            electionModuleConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            value:'allowed',
        },
        {
            supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            value:'allowed',
        },
        {
            supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            value:'allowed',
        }

    ],
    }

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/modules`,
                { ...allElectionModuleData }
            )
            .then(response => {
                console.log("response.data", response.data);
                dispatch(setPostModuleData(response));
            }).catch(err => {
                console.log(err)
            });
    }
}

export const createElection = function createElection(electionName) {
    
    return function (dispatch) {
        dispatch({
            type: CREATE_ELECTION_MODULE,
            payload: electionName
        })
    };
}

export const updateElection = function updateElection(election) {

    return function (dispatch) {
        dispatch({
            type: UPDATE_ELECTION_MODULE,
            payload: election
        })
    };
}

export const saveElection = function saveElection(election) {

    return function (dispatch) {

        dispatch({
            type: UPDATE_ELECTION_MODULE,
            payload: {} 
        })
    };
}

export const submitElection = function saveElection(election) {
    let allElectionModuleData = {
        "name": election.name,
        "id": "1268362183761283718236",
        "divisionCommonName":'Provintial',
        "createdBy":'admin',
        "createdAt":'',
        "updatedAt":'',
        "candidateFormConfiguration": [
        ],
        "supportingDocuments": [
            {
                supportDocConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            },
            {
                supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            },
            {
                supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            }
        ],
        "divisionConfig":[
            {
                divisionName: 'Sample',
                divisionCode: 'code',
                noOfCandidates: '1',
            },
            {
                divisionName: 'Sample3',
                divisionCode: 'code',
                noOfCandidates: '2',
            },
            {
                divisionName: 'Sample5',
                divisionCode: 'code',
                noOfCandidates: '3',
            }
        ],
    "electionConfig": [
        {
            electionModuleConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            value:'allowed',
        }
    ],
    }

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/election-modules`,
                { ...allElectionModuleData , ...election}
            )
            .then(response => {
                if(response.data){
                    election.submited = true;
                    dispatch({
                        type: UPDATE_ELECTION_MODULE,
                        payload: election
                    });
                    dispatch(openSnackbar({ message: election.name + ' has been submitted for approval' }));
                }
            }).catch(err => {
                console.log(err)
            });
    }
}

export const setUpdatedTemplateData = (val) => {
    return {
        type: UPDATE_ELECTION_MODULE,
        payload: val
    }
}

  export function editElection(moduleId,election) {
    return function (dispatch) {
     
      const response = axios
      .put(
        `${API_BASE_URL}/election-modules/${moduleId}`,
        {...election}
      )
      .then(response => {
         dispatch(setUpdatedTemplateData(response.data));
         dispatch(openSnackbar({ message: election.name + ' has been updated ' }));
      }).catch(err => {
            console.log(err)
      });
    };
  }
//get pending election modules
const pendingElectionModuleLoaded = (getPendingElectionModules) => {
    return {
        type: GET_PENDING_ELECTION_MODULE,
        payload: getPendingElectionModules,
    };
};

export function getPendingElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/PENDING/all`,
            )
            .then(response => {
                const getPendingElectionModules = response.data;
                dispatch(
                    pendingElectionModuleLoaded(getPendingElectionModules)
                );
            }).catch(err => {
                const getPendingElectionModules = [];
                dispatch(
                    pendingElectionModuleLoaded(getPendingElectionModules)
                );
                console.log(err)
            });
    };
}

//get approve election modules
const approvedElectionModuleLoaded = (getApprovedElectionModules) => {
    return {
        type: GET_APPROVED_ELECTION_MODULE,
        payload: getApprovedElectionModules,
    };
};

export function getApproveElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/APPROVE/all`,
            )
            .then(response => {
                const getApprovedElectionModules = response.data;
                dispatch(
                    approvedElectionModuleLoaded(getApprovedElectionModules)
                );
            }).catch(err => {
                const getApprovedElectionModules = [];
                dispatch(
                    approvedElectionModuleLoaded(getApprovedElectionModules)
                );
                console.log(err)
            });
    };
}

//get approve election modules
const rejectedElectionModuleLoaded = (getRejectedElectionModules) => {
    return {
        type: GET_REJECTED_ELECTION_MODULE,
        payload: getRejectedElectionModules,
    };
};

export function getRejectedElectionModules() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/REJECT/all`,
            )
            .then(response => {
                const getRejectedElectionModules = response.data;
                dispatch(
                    rejectedElectionModuleLoaded(getRejectedElectionModules)
                );
            }).catch(err => {
                const getRejectedElectionModules = [];
                dispatch(
                    rejectedElectionModuleLoaded(getRejectedElectionModules)
                );
                console.log(err)
            });
    };
}

//delete election modules
const deletedElectionModuleLoaded = (moduleId) => {
    return {
        type: GET_DELETED_ELECTION_MODULE,
        payload: moduleId,
    };
};

export function deleteElectionModule(moduleId) {
    debugger;
    return function (dispatch) {

        const response = axios
            .delete(
                `${API_BASE_URL}/modules/${moduleId}`,
            )
            .then(response => {
                const getDeletedElectionModuleLoaded = response.data;
                dispatch(
                    deletedElectionModuleLoaded(moduleId)
                );
                dispatch(openSnackbar({ message: ' Election template has been deleted' }));

            }).catch(err => {
                // const moduleId = [];
                dispatch(
                    deletedElectionModuleLoaded(moduleId)
                );
                console.log(err)
            });
    };
}

export const getFieldOptions = function getFieldOptions() {
    let promises = [];

    promises.push(axios.get(`${API_BASE_URL}/field-options/candidate-configs`));
    promises.push(axios.get(`${API_BASE_URL}/field-options/candidate-supporting-docs`));
    
    return axios.all(promises)
        .then(args =>{
            return {
                candidateConfigs: args[0].data,
                candidateSupportingDocs: args[1].data,
            }
        });
}

//----------- End of save Create Election Data ----------------
export const setGetTemplateData = (val) => {
    return {
        type: GET_ELECTION_TEMPLATE_DATA,
        payload: val
    }
}

export function getElectionTemplateData(moduleId) {
    //TODO: config ids should get from the front end and the array should be dynamic
    let allElectionModuleData = {
        "moduleId": moduleId,
        "divisionCommonName":'Provintial',
        "createdBy":'admin',
        "createdAt":'',
        "updatedAt":'',
        "candidateFormConfiguration": [
            {
                candidateConfigId: '1',
            },
            {
                candidateConfigId: '2',
            },
            {
                candidateConfigId: '3',
            },
            {
                candidateConfigId: '4',
            },
        ],
        "supportingDocuments": [
            {
                supportDocConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            },
            {
                supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            },
            {
                supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            }
        ],
        "divisionConfig":[
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            },
            {
                divisionName: 'division name',
                divisionCode: 'code',
                noOfCandidates: 'noOfCandidates',
            }
        ],
    "electionConfig": [
        {
            electionModuleConfigId: '15990459-2ea4-413f-b1f7-29a138fd7a97',
            value:'allowed',
        },
        {
            supportDocConfigId: 'fe2c2d7e-66de-406a-b887-1143023f8e72',
            value:'allowed',
        },
        {
            supportDocConfigId: 'ff4c6768-bdbe-4a16-b680-5fecb6b1f747',
            value:'allowed',
        }

    ],
    }
    // return {
    //     type: GET_ELECTION_TEMPLATE_DATA,
    //     payload: allElectionModuleData
    // }
    return function (dispatch) {
        const response = axios
            .get(
                `${API_BASE_URL}/modules/${moduleId}`,
                { ...allElectionModuleData }
            )
            .then(response => {
                console.log("response.data", response.data);
                dispatch(setGetTemplateData(response.data));
            }).catch(err => {
                console.log(err)
            });
    }
}

export const asyncValidateTemplate = function asyncValidateTemplate(templateName) {
    let promises = [];
    if(templateName){
        promises.push(axios.get(`${API_BASE_URL}/modules/validations/${templateName}`));
        return axios.all(promises)
            .then(args =>{
                return {
                    exist: args[0].data,
                }
            });
    }
}