var API_BASE_URL = 'http://localhost:8280/nominations/0.9';
var PDF_GENARATION_SERVICE_URL = 'http://localhost:5000/';
var AUTH_BASE_URL = 'http://localhost:3001/';


if (process.env.NODE_ENV === 'production'){
    API_BASE_URL = 'https://apim-gw.ecstag.opensource.lk/nominations/0.9';
    PDF_GENARATION_SERVICE_URL = 'http://nominations-pdf-20keps.pxe-dev-platformer-1552477983757-1pdna.svc';
    AUTH_BASE_URL = 'https://authnominations.ecstag.opensource.lk';
}

// module.exports = {
//     API_BASE_URL,
//     PDF_GENARATION_SERVICE_URL,
//     AUTH_BASE_URL
// }
export {
    API_BASE_URL,
    PDF_GENARATION_SERVICE_URL,
    AUTH_BASE_URL
}
