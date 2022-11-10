export const API_ROOT = 'http://localhost:3000/api/v1/';
//export const API_ROOT = 'https://dummyjson.com/';

export default function myFetch<T>(url: string): Promise<T> {
    return fetch(API_ROOT + url).then( x=>x.json() );
}