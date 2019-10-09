import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data/data.service';
import { AlertService } from 'src/app/shared/common/alert';



@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  public expenses: any;
  public all_users: any;
  public all_users_name: any;
  public addExpenseForm: FormGroup;
  public submitted: boolean = false;
  //multiselect
  private value: any = [];
  private _disabledV: string = '0';
  private disabled: boolean = false;


  constructor(private dataService: DataService, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit() {
    this.showExpenses();
    this.showUsers();
    this.addExpenseForm = this.formBuilder.group({
      name: [null, Validators.required],
      amount: [null, Validators.required],
      paidby: [null, Validators.required],
      oweby: [{ value: null, disabled: true }]
    });
  }
  // convenience getter for easy access to form fields
  get formFields() { return this.addExpenseForm.controls; }

  showExpenses() {
    this.dataService.getExpenses().subscribe(
      resp => {
        this.expenses = resp;
      }
    );
  }
  showUsers() {
    this.dataService.getUsers().subscribe(
      resp => {
        this.all_users = resp;
        let users = this.all_users;

        if (users.length > 0) {
          this.all_users_name = users.map(u => u.name);
        }
      }
    );
  }
  addExpense(formValue) {
    this.submitted = true;



    // stop here if form is invalid
    if (this.addExpenseForm.invalid) {
      return;
    }
    else {
      let owebyValue = this.addExpenseForm.controls['oweby'].value;
      if (owebyValue == null) owebyValue == null;
      else {
        owebyValue = owebyValue.map(o => o.text);
      }
      let params = {
        "name": formValue.name.toLowerCase(),
        "paidby": formValue.paidby,
        "amount": formValue.amount,
        "oweby": owebyValue
      }
      let users = this.all_users.filter(item => item.name === params.name);
      if (users.length > 0) {
        let msg = users[0].name + ' is present in the list. Please try again with another name.';
        this.alertService.openModal(msg, 'Duplicate Expense Name exist');
      }
      else if (owebyValue == null || owebyValue == undefined) {
        this.alertService.openModal('Please select one or more than one persons', 'Owe by persons not selected');
      }
      else {
        this.dataService.addExpense(params).subscribe(
          resp => {
            this.alertService.openModal('Record added successfully', 'Success')
          },
          error => {
            // Show Error
            console.log('App service error handler: ' + JSON.stringify(error));
          }, () => {
            this.showExpenses();
            this.addExpenseForm.reset();
            Object.keys(this.addExpenseForm.controls).forEach(key => {
              this.addExpenseForm.get(key).setErrors(null);
            });
          });
      }

    }


  }
  //multiselect 

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }

}
