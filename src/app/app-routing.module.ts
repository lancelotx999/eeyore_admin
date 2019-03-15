import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CommonModule } from '@angular/common';

import { UsersComponent } from './users/users.component';
import { MerchantUsersComponent } from './merchant-users/merchant-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'merchants', component: MerchantUsersComponent },
    { path: 'merchantDetail/:id', component: MerchantDetailComponent },
    { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
    // declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
