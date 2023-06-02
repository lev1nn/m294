import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionAddComponent } from './pages/transaction-add/transaction-add.component';
import { CustomerComponent } from './pages/customer/customer.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "accounts", component: AccountComponent },
  { path: "transactions", component: TransactionComponent },
  { path: "transaction", component: TransactionAddComponent },
  { path: "profile", component: CustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
