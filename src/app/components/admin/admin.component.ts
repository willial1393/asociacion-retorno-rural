import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AppComponent} from '../../app.component';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    displayDialog: boolean;
    product: Product = new Product();
    selectedProduct: any;
    newProduct: boolean;
    products: Product[] = [];
    cols: any[] = [];

    constructor(private messageService: MessageService,
                private productService: ProductService,
                private sanitizer: DomSanitizer,
                private appComponent: AppComponent,
                private route: Router) {
        this.cols = [
            {field: 'name', header: 'Nombre', type: 'text', required: true},
            {field: 'description', header: 'Descripción', type: 'text-area', required: true},
            {field: 'image', header: 'Imagen', type: 'image', required: true},
            {field: 'value', header: 'Precio', type: 'text', required: true},
            {field: 'discount', header: 'Descuento', type: 'text', required: true},
        ];
        this.loadProducts();
    }

    ngOnInit() {
    }

    onUpload(event, product: Product, form) {
        const reader = new FileReader();
        reader.readAsDataURL(event.files[0]);
        reader.onload = (_event) => {
            product.image = reader.result.toString();
        };
        form.clear();
    }

    loadProducts() {
        this.appComponent.showLoading(true);
        this.productService.getAll().subscribe(res => {
            this.appComponent.showLoading(false);
            if (res['result']) {
                this.products = res['response'];
            } else {
                this.appComponent.showErrorService(res);
            }
        });
    }

    openToast() {
        this.messageService.add({
            key: 'c',
            severity: 'warn',
            summary: '¿Desea eliminar el Producto?',
            detail: ''
        });
    }

    closeToast() {
        this.messageService.clear('c');
    }

    showDialogToAdd() {
        this.selectedProduct = null;
        this.newProduct = true;
        this.product = new Product();
        this.displayDialog = true;
    }

    save() {
        this.appComponent.showLoading(true);
        this.productService.store(this.product).subscribe(res => {
            this.appComponent.showLoading(false);
            if (res['result']) {
                this.displayDialog = false;
                this.product = null;
                this.loadProducts();
                this.appComponent.showToast(
                    'Operación exitosa',
                    'Producto guardado',
                    'success'
                );
            } else {
                this.appComponent.showErrorService(res);
            }
        });
    }

    delete() {
        this.displayDialog = false;
        this.closeToast();
        this.appComponent.showLoading(true);
        const product: Product = new Product();
        Object.assign(product, this.selectedProduct);
        this.productService.destroy(product).subscribe(res => {
            this.appComponent.showLoading(false);
            if (res['result']) {
                this.loadProducts();
                this.appComponent.showToast(
                    'Operación exitosa',
                    'Producto eliminado',
                    'success'
                );
            } else {
                this.appComponent.showErrorService(res);
            }
        });
    }

    onRowSelect(event) {
        this.newProduct = false;
        this.product = this.cloneProduct(event.data);
        this.displayDialog = true;
    }

    cloneProduct(p: Product): Product {
        const product = new Product();
        for (const prop of Object.keys(p)) {
            product[prop] = p[prop];
        }
        return product;
    }

    public getSantizeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }


}

