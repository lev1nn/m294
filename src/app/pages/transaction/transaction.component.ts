import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/data/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  personsDataSource = new MatTableDataSource<TransactionComponent>();

  columns = ['id', 'payingAccount', 'receivingAccount', 'amount', 'time', 'description' ];
  accountDataSource: Array<Transaction> = [];

  public constructor(private transactionService: TransactionService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  reloadData() {
    this.transactionService.getList().subscribe(obj => {
      this.accountDataSource = obj;
    });
  }

  async edit(e: Transaction) {
    await this.router.navigate(['transactions', e.id]);
  }

  async add() {
    await this.router.navigate(['transactions']);
  }

  delete(e: Transaction) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Transaction?',
        message: 'Do you really want to delete the selected transaction?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.transactionService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Transaction deleted!"', 'Close', {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open('Transaction could not be deleted, server error!', 'Close', {duration: 5000});
            }
          },
          error: () => this.snackBar.open('Transaction could not be deleted, server error!', 'Close', {duration: 5000})
        });
      }
    });
  }
}
