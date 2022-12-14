export const API_ROOT = import.meta.env.VITE_API_ROOT;

    export function myFetch<T>(url: string, data: any = null, method?: string, headers?: HeadersInit ): Promise<T> {
    const options: RequestInit = {
        method: method ?? (data ? 'POST' : 'GET'),
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    };
    return fetch(url, options).then( x=>{
        if(x.ok){
            return x.json();
        }else{
            return x.json().then(y=> { throw(y) });
        }
     } );
}

export default function api<T>(action: string, data: any = null, method?: string ){
    return myFetch<T>(API_ROOT + action, data, method);
}