import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: Product[] = [];

    constructor(private productService: ProductService,
                private appComponent: AppComponent) {
        appComponent.showLoading(true);
        productService.getAll().subscribe(res => {
            appComponent.showLoading(false);
            if (res['result']) {
                this.products = res['response'];
            } else {
                appComponent.showErrorService(res);
            }
        });
    }

    ngOnInit(): void {
    }


}
