import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppGlobal} from '../utilities/app-global';
import {Product} from '../models/Product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    url = environment.endpoint + 'products';

    constructor(private http: HttpClient,
                private appGlobal: AppGlobal) {
    }

    public getAll() {
        return this.http.get(this.url, {headers: this.appGlobal.headers});
    }

    public store(product: Product) {
        return this.http.post(this.url, product.getJson(), {headers: this.appGlobal.headers});
    }

    public destroy(product: Product) {
        return this.http.post(this.url + '/destroy', product.getJson(), {headers: this.appGlobal.headers});
    }
}
