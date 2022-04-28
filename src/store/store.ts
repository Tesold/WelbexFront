export function setAccessToken(access_token:string){
    localStorage.setItem('access_token', access_token);
}

export function getAccessToken(){
    return localStorage.getItem('access_token');
}

export function setRefreshToken(refresh_token:string){
    localStorage.setItem('refresh_token', refresh_token);
}

export function getRefreshToken(){
    return localStorage.getItem('refresh_token');
}

export function setUser(user:any){
    localStorage.setItem('user', user);
}

export function getUser(){
    return localStorage.getItem('user');
}