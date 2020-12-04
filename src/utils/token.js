import cookie from 'js-cookie';

const key = 'cdcsoncnn';

export function getToken() {
    return cookie.get(key);
}

export function setToken(token) {
    cookie.set(key, token);
}

export function removeToken() {
    cookie.remove(key);
}
