export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
}

export const setAccessToken = (accessToken) => {
    sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
}

export const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem('refreshToken', `Bearer ${refreshToken}`);
}

export const addElipsis = (str,limit) => {
    return str.length>limit ? str.substring(0,limit)+'...' : str;
}

export const getType = (value, body) => {
    if(value.params){
        return  { params: body }
    }
    else if(value.query){
        if(typeof body === 'object') {
            return { query: body._id }
        }
        else { 
            return { query: body }
        }
    }
    return {};
}