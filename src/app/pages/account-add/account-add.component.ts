import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/data/account';
import { AccountService } from 'src/app/service/account.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent {
  account = new Account();
  public objForm = new UntypedFormGroup({
    accountName: new UntypedFormControl(''),
    amount: new UntypedFormControl(''),
    customer: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private accountService: AccountService) {}

  async back() {
    await this.router.navigate(['accounts']);
  }

  async save(formData: any) {
    this.account = Object.assign(formData);

    if (this.account.id) {
      this.accountService.update(this.account).subscribe({
        next: () => {
          this.snackBar.open('Account saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save account', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.accountService.save(this.account).subscribe({
        next: () => {
          this.snackBar.open('New account saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new account', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
