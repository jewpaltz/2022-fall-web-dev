import { reactive } from "vue";

const session = reactive( {
    user: null as User | null,
});

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

export default session;