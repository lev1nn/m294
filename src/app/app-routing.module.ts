import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { TranscationComponent } from './pages/transcation/transcation.component';
import { CustomerComponent } from './pages/customer/customer.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "accounts", component: AccountComponent },
  { path: "transactions", component: TranscationComponent },
  { path: "profile", component: CustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
