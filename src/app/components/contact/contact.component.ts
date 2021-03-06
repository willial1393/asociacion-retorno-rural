import {Component, OnInit} from '@angular/core';
import {Config} from '../../models/config';
import {MessageService} from 'primeng/api';
import {ConfigService} from '../../services/config.service';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

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

}
