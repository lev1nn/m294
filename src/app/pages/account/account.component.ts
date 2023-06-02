import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account } from 'src/app/data/account';
import { AccountService } from 'src/app/service/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  personsDataSource = new MatTableDataSource<AccountComponent>();

  columns = ['id', 'accountName', 'balance', 'actions'];
  accountDataSource: Array<Account> = [];

  public constructor(private accountService: AccountService, private dialog: MatDialog,
                     private router: Router, private snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    await this.reloadData();
  }

  reloadData() {
    this.accountService.getList().subscribe(obj => {
      this.accountDataSource = obj;
    });
  }

  async edit(e: Account) {
    await this.router.navigate(['accounts', e.id]);
  }

  async add() {
    await this.router.navigate(['accounts']);
  }

  delete(e: Account) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Account?',
        message: 'Do you really want to delete the selected account?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.accountService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Account deleted!"', 'Close', {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open('Account could not be deleted, server error!', 'Close', {duration: 5000});
            }
          },
          error: () => this.snackBar.open('Account could not be deleted, server error!', 'Close', {duration: 5000})
        });
      }
    });
  }
}
