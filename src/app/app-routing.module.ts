import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './components/admin/admin.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
// AuthGuardService
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuardService]
    }, {
        path: 'about',
        component: AboutComponent,
    }, {
        path: 'contact',
        component: ContactComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes),
    ]
})
export class AppRoutingModule {
}
