import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCreateComponent } from './components/admin-create/admin-create.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { AuthGuard, LoginGuard } from './shared/guards';

const routes: Routes = [
    { path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
        { path: 'login', component: AdminLoginComponent, canActivate: [ LoginGuard ] },
        { path: 'dashboard', component: AdminDashboardComponent, canActivate: [ AuthGuard ] },
        { path: 'create', component: AdminCreateComponent, canActivate: [ AuthGuard ] },
        { path: 'edit/:id', component: AdminEditComponent, canActivate: [ AuthGuard ] }
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
     ],
    exports: [
        RouterModule
     ]
})
export class AdminRoutingModule { }