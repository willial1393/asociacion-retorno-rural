import {User} from '../models/user';

export class ConfigGlobal {

    constructor() {
    }

    // login
    public static getUserLogin(): User {
        return JSON.parse(localStorage.getItem('login'));
    }

    public static setUserLogin(user: User) {
        localStorage.setItem('login', JSON.stringify(user));
    }


}
