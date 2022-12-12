export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;

export default function myFetch<T>(url: string, data: any = null, method?: string ): Promise<T> {
    const options: RequestInit = {
        method: method ?? (data ? 'POST' : 'GET'),
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    };
    return fetch(API_ROOT + url, options).then( x=>{
        if(x.ok){
            return x.json();
        }else{
            return x.json().then(y=> { throw(y) });
        }
     } );
}