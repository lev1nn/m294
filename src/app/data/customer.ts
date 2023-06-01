import { Address } from "./address";

export class Customer {
  public id!: number;
  public userName = '';
  public firstName = '';
  public lastName = '';
  public age = 0;
  public address = new Address();
}
