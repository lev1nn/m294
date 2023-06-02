import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/data/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent {
  transaction = new Transaction();
  public objForm = new UntypedFormGroup({
    payingAccount: new UntypedFormControl(''),
    receivingAccount: new UntypedFormControl(''),
    amount: new UntypedFormControl(''),
    description: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private transactionService: TransactionService) {}

  async back() {
    await this.router.navigate(['transactions']);
  }

  async save(formData: any) {
    this.transaction = Object.assign(formData);

    if (this.transaction.id) {
      this.transactionService.update(this.transaction).subscribe({
        next: () => {
          this.snackBar.open('Transaction saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save transaction', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.transactionService.save(this.transaction).subscribe({
        next: () => {
          this.snackBar.open('New transaction saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new transaction', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
