export const TOKEN_KEY = 'token';

const apiService = async<T= any> (uri: string, method: string = 'GET', body?: {}) => {
    const headers: any = {}
    const options: any = {
        method,
        headers
    };
    
    const token = localStorage.getItem(TOKEN_KEY)

    if (token) {
        headers['Authorization'] = `Bearer ${token}` 
    } 

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body) 
    }
    
    try {
        const res = await fetch(uri, options);

        if (res.status === 404) {
            throw new Error('check uri and server path')
        }

        if (res.status === 401) {
            throw new Error('check localStorage or check server endpoint')
        }

        if (res.status === 500) {
            throw new Error('check server terminal')
        }

        if (res.ok) {
            return <T>await res.json()
        } 
    } catch (error) {
        console.error(error)
    }
}

export const setStorage = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload(true); 
    // LOOK UP HISTORY.LISTEN
}

export default apiService;