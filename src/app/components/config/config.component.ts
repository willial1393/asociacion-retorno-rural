import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {AppComponent} from '../../app.component';
import {ConfigService} from '../../services/config.service';
import {Config} from '../../models/config';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

    config = new Config();

    constructor(private messageService: MessageService,
                private configService: ConfigService,
                private appComponent: AppComponent) {
        this.loadConfig();
    }

    ngOnInit() {
    }

    loadConfig() {
        this.appComponent.showLoading(true);
        this.configService.getAll().subscribe(res => {
            this.appComponent.showLoading(false);
            if (res['result']) {
                this.config = res['response'][0];
            } else {
                this.appComponent.showErrorService(res);
            }
        });
    }

    save() {
        this.appComponent.showLoading(true);
        this.configService.store(this.config).subscribe(res => {
            this.appComponent.showLoading(false);
            if (res['result']) {
                this.appComponent.showToast('Configuración guardada', '', 'success');
                this.loadConfig();
            } else {
                this.appComponent.showErrorService(res);
            }
        });
    }
}
