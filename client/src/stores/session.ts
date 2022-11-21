import myFetch from "@/services/myFetch";
import { computed, reactive } from "vue";

const session = reactive( {
    user: null as User | null,
    loading: 0,
    error: null as string | null,
    messages: [] as Message[],
});
export default session;

export function setError(error: string | null) {
    session.error = error;
    if(error){
        session.messages.push({ type: 'danger', text: error});
    }
}

export const isLoading = computed(() => !! session.loading);

export async function api<T>(url: string, data: any = null, method?: string ){
    session.loading++;
    setError(null);
    try {
        return await myFetch<T>(url, data, method);
    } catch (error) {
        setError(error as string);
    }finally{
        session.loading--;
    }
    return {} as T;
}


export function login(name: string, email: string, password: string) {
    session.user = {
        name,
        email,
        password,
    };
}

export function logout() {
    session.user = null;
}

export interface User {
    name: string;
    email: string;
    password?: string;
}

export interface Message {
    text: string;
    type: 'danger' | 'warning' | 'success' | 'info';
}
