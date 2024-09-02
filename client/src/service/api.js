import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:8000'; //http://localhost:8000

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    headers: {
        "Accept": "application/json, form-data",
        "Content-Type": "application/json"
    }
});


axiosInstance.interceptors.request.use(
    function(config) {
        if(config.TYPE.params){
            config.params = config.TYPE.params
        } 
        else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }

        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    function (response) {
        //stop global loader here
        return processResponse(response);

    },
    function (error) {
        //stop global loader here
        return Promise.reject(processError(error));
    }
);


const processResponse = (response) => {
    if(response?.status === 200) {
        return { 
            isSuccess: true, 
            data: response.data 
        }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
};

const processError = async (error) => {
    if(error.response) {
        // Request made and server responded with a status other
        // that falls out of range 2.x.x
        if(error.response?.status===403){
            // const { url, config } = error.response;
            console.log(error);
            try {
                let response = await API.getRefreshToken({ token: getRefreshToken() });
                if (response.isSuccess) {
                    sessionStorage.clear();
                    setAccessToken(response.data.accessToken);

                    const requestData = error.toJSON();

                    let response1 = await axios({
                        method: requestData.config.method,
                        url: requestData.config.baseURL + requestData.config.url,
                        headers: { "content-type": "application/json", "authorization": getAccessToken() },
                        params: requestData.config.params
                    });
                }
            } catch (error) {
                return Promise.reject(error)
            }
        }
        else{
            console.log('Error in response: ', error.toJSON())
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure,
                code: error.response.status
            }
        }       
    }
    else if( error.request) {
        // Request made but no response was received
        console.log('Error in request: ', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else {
        // Something happened in setting up request that triggers an error
        console.log('Error in network', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }

};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if(showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if(showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(percentCompleted);
                }
            }
        });
    
}

export { API };
