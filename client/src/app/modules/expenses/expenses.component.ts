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
  public settleups: any;
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
    this.getSettleUp();
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
            //settleup
            for (let index = 0; index < owebyValue.length; index++) {
              const user_name = owebyValue[index];
              console.log('user_name ' + user_name);
              let settleupList = this.settleups.filter(item => item.name === user_name);
              console.log('settleupList ' + JSON.stringify(settleupList));
              const payto_details = settleupList[0].payto;
              let pay_obj = {};
              if (payto_details.length > 0) {
                let pay_to_obj = payto_details.filter(item => item.to === params.paidby);
                if (pay_to_obj.length > 0) {
                  const cal_amount = Number(params.amount / owebyValue.length);
                  payto_details[0].amount = Number(payto_details[0].amount) + cal_amount;
                  console.log('payto_details.amount ' + JSON.stringify(payto_details));
                }
                else {
                  let paytoId = payto_details[payto_details.length - 1].id + Number(1);
                  const cal_amount = Number(params.amount / owebyValue.length);
                  pay_obj = {
                    "to": params.paidby,
                    "amount": cal_amount,
                    "id": paytoId
                  }
                  payto_details.push(pay_obj);
                  console.log('payto_details ' + JSON.stringify(payto_details));
                }





                // let payto_obj = payto_details.filter(item => item.to === params.paidby);
                // if (payto_obj == null || payto_obj == undefined) {
                //   let paytoId = payto_details[payto_details.length - 1].id + Number(1);
                // }
                // else {
                //   let cal_amount = Number(params.amount / owebyValue.length);
                //   payto_obj.amount = Number(payto_obj.amount) + cal_amount;
                // }


              }
              else { }

              // // let update_settleup_param={             
              // //               "name": "tim parker",
              // //               "payto": []              
              // //           }

              // //           this.dataService.updateSettleUp(update_settleup_param).subscribe(
              // //             resp => {
              // //               //console.log('Record added successfully')
              // //             },
              // //             error => {
              // //               // Show Error
              // //               console.log('App service error handler: ' + JSON.stringify(error));
              // //             });



            }




          });
      }

    }



  }
  getSettleUp() {
    this.dataService.getSettleUps().subscribe(
      resp => {
        this.settleups = resp;
        // let paytoList = this.settleups.filter(item => item.name === this.user_name);
        // this.payto_details = paytoList[0].payto;
        // if (this.payto_details.length > 0) this.no_debt = false;
        // else this.no_debt = true;
      }
    );
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
