import { Account } from "./account";

export class Transaction {
  public id!: number;
  public payingAccount = new Account();
  public receivingAccount = new Account();
  public amount = 0;
  public time = '';
  public description = '';
}
