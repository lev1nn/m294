import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/data/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  public objForm = new UntypedFormGroup({
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    age: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
              private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getSelf().subscribe(obj => {
      this.customer = obj;
      this.objForm = this.formBuilder.group(obj);
    });
  }

  async back() {
    await this.router.navigate(['persons']);
  }

  async save(formData: any) {
    this.customer = Object.assign(formData);

    if (this.customer.id) {
      this.customerService.update(this.customer).subscribe({
        next: () => {
          this.snackBar.open('Person saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save person', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.customerService.save(this.customer).subscribe({
        next: () => {
          this.snackBar.open('New person saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new person', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
