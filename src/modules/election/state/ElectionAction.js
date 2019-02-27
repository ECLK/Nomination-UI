import {
    ELECTION_LOAD_SUCCESS,
    ELECTIONS_LOADING,
    POST_ACTIVE_ELECTION_DATA,
    POST_ELECTION,
    GET_ELECTION_MODULE,
    SET_ELECTION_TIME_LINE
} from "./ElectionTypes";
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";

// import store from '../store';


export function postActiveElections() {

    return function (dispatch) {
        const response = axios
            .post(
                `${API_BASE_URL}/activeElections`,
                {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                }
            )
            .then(response => {
                dispatch({
                    type: POST_ACTIVE_ELECTION_DATA,
                    payload: response.data
                })
            });
    };
}

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

export function setElectionTimeLine(timeLineData) {
    debugger;
    let electionTimeLine = {
        nominationStart: timeLineData.nominationStart,
        nominationEnd: timeLineData.nominationEnd,
        objectionStart: timeLineData.objectionStart,
        objectionEnd: timeLineData.objectionEnd
    };

    return {
        type: SET_ELECTION_TIME_LINE,
        payload: electionTimeLine
    };
}



export function getAllElectionReviews() {
    return function (dispatch) {

        const response = axios
            .get(
                `${API_BASE_URL}/modules/APPROVE/all`,
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



