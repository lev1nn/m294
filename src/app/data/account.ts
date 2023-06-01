import { Customer } from "./customer";

export class Account {
  public id!: number;
  public accountName = '';
  public balance = 0;
  public customer = new Customer();
}
