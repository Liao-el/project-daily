/** 默认缓存期限为7天 */
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// local
export function setLocal(key, value) {
    const json = JSON.stringify({
        value,
        _expire: new Date().getTime() + DEFAULT_CACHE_TIME * 1000
    });
    window.localStorage.setItem(key, json);
}

export function getLocal(key) {
    const json = window.localStorage.getItem(key);
    if (json) {
        const data = JSON.parse(json);
        const {
            value,
            _expire
        } = data;
        /** 在有效期内直接返回 */
        if (_expire === null || _expire >= Date.now()) {
            return value;
        }
        removeLocal(key);
    }
    return undefined;
}
// 获取token
export function getToken() {
    let json = window.localStorage.getItem('userInfo_end')
    if (json) {
        const data = JSON.parse(json);
        return data.value.token;
    }

    return undefined
}

export function removeLocal(key) {
    window.localStorage.removeItem(key);
}

export function clearLocal() {
    // window.localStorage.clear();
    removeLocal('userInfo_end')
    removeLocal('end_remember')
    removeLocal('menusList_end')
}


// session
export function setSession(key, value) {
    const json = JSON.stringify(value);
    sessionStorage.setItem(key, json);
}

export function getSession(key) {
    const json = sessionStorage.getItem(key);
    if (json) {
        return JSON.parse(json);
    }
    return undefined;
}

export function removeSession(key) {
    window.sessionStorage.removeItem(key);
}

export function clearSession() {
    window.sessionStorage.clear();
}
