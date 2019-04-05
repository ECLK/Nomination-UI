console.log("process.env",process.env);
// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// export const ELECTION_ID = process.env.REACT_APP_ELECTION_ID;
// export const API_BASE_URL = 'https://nominations.ecdev.opensource.lk/ec-election';
var API_BASE_URL = "https://nominations.ecdev.opensource.lk/ec-election";

if(window._env_ && window._env_.API_BASE_URL){
    API_BASE_URL = window._env_.API_BASE;
}

export {
    API_BASE_URL  
} 
export const ELECTION_ID = '43680f3e-97ac-4257-b27a-5f3b452da2e6';
