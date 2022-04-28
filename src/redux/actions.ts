export function setAccessToken(token:string)
{
    return{
        type: 'SET_ACCESSTOKEN',
        payload: token
    }
}

export function setLogIn()
{
    return{
        type: 'LOG_IN',
    }
}

export function setLogOut()
{
    return{
        type: 'LOG_OUT',
    }
}