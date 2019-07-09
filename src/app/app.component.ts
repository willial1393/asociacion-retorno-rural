import {Component} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {User} from './models/user';
import {ConfigGlobal} from './utilities/config-global';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'landing-modules';
    public styleCards = {
        maxwidth: '300px',
        backgroundColor: 'rgba(173,173,173,0.12)',
        color: 'white'
    };
    displayLoading = false;
    items: MenuItem[];
    display: boolean;
    userLogin: User = new User();

    constructor(private messageService: MessageService,
                private router: Router,
                private userService: UserService) {
        this.items = [
            {
                label: 'Sobre nosotros',
                icon: 'pi pi-fw pi-users',
                command: this.about()
            }, {
                label: 'Contáctanos',
                icon: 'pi pi-fw pi-comments',
                command: this.contact()
            },
        ];
    }

    closeMessage() {
        this.messageService.clear('messageDialog');
    }

    showDialog() {
        this.display = true;
    }

    showToast(title: string, message: string, type: string) {
        this.messageService.add({
            key: 'toast',
            severity: type,
            summary: title,
            detail: message
        });
    }

    showMessage(title: string, message: string, type: string) {
        this.messageService.add({
            key: 'messageDialog',
            severity: type,
            summary: title,
            detail: message
        });
    }

    showErrorService(errorMessage) {
        this.messageService.add({
            key: 'messageDialog',
            severity: 'error',
            summary: '',
            detail: errorMessage['error'],
            life: 60000
        });
    }

    showLoading(value: boolean) {
        this.displayLoading = value;
    }

    login() {
        this.userService.login(this.userLogin).subscribe(res => {
            if (res['result']) {
                const user = res['response'];
                if (user) {
                    this.showToast(
                        '¡¡¡Bienvenido!!!',
                        user.name,
                        'success');
                    ConfigGlobal.setUserLogin(user);
                    this.router.navigate(['admin']);
                    this.display = false;
                } else {
                    this.showToast(
                        'Error',
                        'Usuario o contraseña incorrecta',
                        'error');
                }
            } else {
                this.showErrorService(res);
            }
        });
    }

    private about() {
        return () => {
            this.router.navigate(['about']);
        };
    }

    private contact() {
        return () => {
            this.router.navigate(['contact']);
        };
    }
}
