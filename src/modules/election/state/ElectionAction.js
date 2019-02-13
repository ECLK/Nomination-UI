import {
    ELECTION_LOAD_SUCCESS, 
    ELECTIONS_LOADING, 
    POST_ACTIVE_ELECTION_DATA,
    POST_ELECTION,
    GET_ELECTION_MODULE,
    SET_ELECTION_TIME_LINE,
    POST_CALL_ELECTION,
    SAVE_ELECTION_TIME_LINE,
    SAVE_ELECTION_CONFIG
} from "./ElectionTypes";
import {API_BASE_URL} from "../../../config.js";
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
//                   }
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
            {...electionData}
      )
      .then(response => {
        console.log("response.data",response.data);
       let res = {
        election_id:response.data.id,
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
        console.log("getElectionModules",getElectionModules);
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

  export function setElectionTimeLine(electionData) {
     let CallElectionData = {
         
        nominationStart: electionData.nominationStart,
        nominationEnd: electionData.nominationEnd,
        objectionStart: electionData.objectionStart,
        objectionEnd: electionData.objectionEnd,
        depositAmount: electionData.depositAmount,
        WeightagePrefarence: electionData.WeightagePrefarence,
        WeightageVote: electionData.WeightageVote

    };

    return {
        type: SET_ELECTION_TIME_LINE,
        payload: CallElectionData
    };
}

export const setCallElectionData = (val) => {
    return {
        type: POST_CALL_ELECTION,
        payload: val
    }
}
export function postCallElectionData(elections) {
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
            {...CallelectionData}
      )
      .then(response => {
        console.log("response.data",response.data);
       let res = {
        election_id:response.data.id,
        electionName: response.data.name,
        ElectionModule: response.data.module_id,
        created_by: response.data.created_by,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at
       }

         dispatch(setCallElectionData(res));
      }).catch(err => {
            console.log(err)
      });
    };
  }

  //----------- Start of save Call Election Data ----------------

  export function postActiveElections(CallElectionData,electionData) {
    //TODO: yujith, config ids should get from the front end and the array should be dynamic
    let timeLineData = [
                         {
                            electionTimeLineConfigId: '0f62755e-9784-4046-9804-8d4deed36f2a',//nominationStart
                            value: CallElectionData.nominationStart,
                            electionId: electionData.election_id,
                         },
                         {
                            electionTimeLineConfigId: 'c06a789c-405c-4e7a-8df2-66766284589b',//nominationEnd
                            value: CallElectionData.nominationEnd,
                            electionId: CallElectionData.objectionStart,
                         },
                         {
                            electionTimeLineConfigId: '675ec08b-2937-4222-94a6-0143a94763f1',//objectionStart
                            value: CallElectionData.objectionStart,
                            electionId: electionData.election_id,
                         },
                         {
                            electionTimeLineConfigId: '64ae3e95-591a-4bf9-8a5b-10803e0eca82',//objectionEnd
                            value: CallElectionData.objectionEnd,
                            electionId: electionData.election_id,
                         },
                       ];

    let confData = [
                        {
                            electionConfigId: '1',
                           value: CallElectionData.depositAmount,
                           electionId: electionData.election_id,
                        },
                        {
                            electionConfigId: '2',
                           value: CallElectionData.WeightageVote,
                           electionId: CallElectionData.objectionStart,
                        },
                        {
                            electionConfigId: '3',
                           value: CallElectionData.WeightagePrefarence,
                           electionId: electionData.election_id,
                        }
                      ];
     
      
    return dispatch => Promise.all([
      dispatch(saveActiveElectionTimeLine(timeLineData)),
      dispatch(saveActiveElectionConfig(confData)),
    ]);
  }

  export function saveActiveElectionTimeLine(timeLineData) {
    return function (dispatch) {
    const response = axios
    .post(
      `${API_BASE_URL}/activeElections/TimeLine`,
          {...timeLineData}
    )
    .then(
        response => response.json()
      ).then(
        json => dispatch({ type: SAVE_ELECTION_TIME_LINE, payload: json }),
        err => console.log(err)
      );
    };
  }
  
  export function saveActiveElectionConfig(confData) {
    return function (dispatch) {
        const response = axios
        .post(
          `${API_BASE_URL}/activeElections/Config`,
              {...confData}
        )
      .then(
        response => response.json()
      ).then(
        json => dispatch({ type: SAVE_ELECTION_CONFIG,  payload: json  }),
        err => console.log(err)
      );
    };
  }

//----------- End of save Call Election Data ----------------




