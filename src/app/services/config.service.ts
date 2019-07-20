import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppGlobal} from '../utilities/app-global';
import {Config} from '../models/config';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    url = environment.endpoint + 'config';

    constructor(private http: HttpClient,
                private appGlobal: AppGlobal) {
    }

    public getAll() {
        return this.http.get(this.url, {headers: this.appGlobal.headers});
    }

    public store(config: Config) {
        return this.http.post(this.url, config, {headers: this.appGlobal.headers});
    }
}
