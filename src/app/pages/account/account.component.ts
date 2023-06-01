import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account } from 'src/app/data/account';
import { AccountService } from 'src/app/service/account.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  personsDataSource = new MatTableDataSource<AccountComponent>();

  columns = ['id', 'accountName', 'balance'];
  accountDataSource: Array<Account> = [];

  public constructor(private accountService: AccountService,
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

  /* async edit(e: Account) {
    await this.router.navigate(['person', e.id]);
  } */

  /* async add() {
    await this.router.navigate(['person']);
  } */

  /* delete(e: Account) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Person?',
        message: 'Do you really want to delete the selected person?'
      }
    }); */

    /* dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.accountService.delete(e.id).subscribe({
          next: response => {
            if (response.status === 200) {
              this.snackBar.open('Person deleted!"', 'Close', {duration: 5000});
              this.reloadData();
            } else {
              this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000});
            }
          },
          error: () => this.snackBar.open('Item could not be deleted, server error!', 'Close', {duration: 5000})
        });
      }
    }); */
  }
