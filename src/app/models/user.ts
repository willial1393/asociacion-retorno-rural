export class User {
    id: number;
    fullname: string;
    email: string;
    user: string;
    password: string;

    getJson() {
        return this;
    }

    getJsonLogin() {
        return this;
    }
}
