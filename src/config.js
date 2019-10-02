var API_BASE_URL = 'http://localhost:8280/nominations/0.9';
var PDF_GENARATION_SERVICE_URL = 'http://localhost:5000/';
var AUTH_BASE_URL = 'http://localhost:3001/';


if (process.env.NODE_ENV === 'production'){
    API_BASE_URL = 'https://apim-gateway.ecdev.opensource.lk/nominations/0.9';
    PDF_GENARATION_SERVICE_URL = 'http://localhost:5000/';
    AUTH_BASE_URL = 'https://authnominations.ecdev.opensource.lk';
}

module.exports = {
    API_BASE_URL,
    PDF_GENARATION_SERVICE_URL,
    AUTH_BASE_URL
}
