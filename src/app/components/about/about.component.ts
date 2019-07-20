import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Config} from '../../models/config';
import {MessageService} from 'primeng/api';
import {ConfigService} from '../../services/config.service';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    showDetails: boolean;
    config = new Config();

    constructor(private router: Router,
                private messageService: MessageService,
                private configService: ConfigService,
                private appComponent: AppComponent) {
        this.showDetails = this.router.url === '/about';
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
                document.getElementById('containerIssuu').innerHTML = '' +
                    '<iframe src="' + this.config.issuu +
                    '" frameborder="0" width="100%"\n' +
                    '            height="800px"></iframe>';
            } else {
                this.appComponent.showErrorService(res);
            }
        });
    }
}
