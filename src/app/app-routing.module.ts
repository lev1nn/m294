import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { AccountAddComponent } from './pages/account-add/account-add.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionAddComponent } from './pages/transaction-add/transaction-add.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AppAuthGuard } from './guard/app.auth.guard';
import { AppRoles } from 'src/app.roles';
const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "accounts", component: AccountComponent, canActivate: [AppAuthGuard], pathMatch: 'full',
    data: {roles: [AppRoles.Read]}
  },
  {
    path: "account", component: AccountAddComponent, canActivate: [AppAuthGuard], pathMatch: 'full',
    data: {roles: [AppRoles.Update]}
  },
  {
    path: "transactions", component: TransactionComponent, canActivate: [AppAuthGuard], pathMatch: 'full',
    data: {roles: [AppRoles.Read]}
  },
  {
    path: "transaction", component: TransactionAddComponent, canActivate: [AppAuthGuard], pathMatch: 'full',
    data: {roles: [AppRoles.Update]}
  },
  {
    path: "profile", component: CustomerComponent, canActivate: [AppAuthGuard], pathMatch: 'full',
    data: {roles: [AppRoles.Update]}
  },
  {
    path: "noaccess", pathMatch: "full", component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
