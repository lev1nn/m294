import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/data/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { MatTableDataSource } from '@angular/material/table';
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

  async add() {
    await this.router.navigate(['transaction']);
  }
}
