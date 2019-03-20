import {
    CREATE_ELECTION_MODULE,
} from "./ElectionTypes";
import { API_BASE_URL } from "../../../config.js";
import axios from "axios";
//----------- Start of save Call Election Data ----------------

export const setPostModuleData = (val) => {
    return {
        type: CREATE_ELECTION_MODULE,
        payload: val
    }
}

export function postCallElectionData(CallElectionData, electionData) {
    //TODO: config ids should get from the front end and the array should be dynamic

    let allElectionModuleData = {
        "moduleId": electionData.module_id,
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
                `${API_BASE_URL}/modules/moduleData`,
                { ...allElectionModuleData }
            )
            .then(response => {
                console.log("response.data", response.data);
                dispatch(setPostModuleData(response));
            }).catch(err => {
                console.log(err)
            });
    };
}


//----------- End of save Create Election Data ----------------
