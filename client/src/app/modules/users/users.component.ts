import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data/data.service';
import { AlertService } from 'src/app/shared/common/alert';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public all_users: any;
  public addUserForm: FormGroup;
  public submitted: boolean = false;

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit() {
    this.showUsers();
    this.addUserForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get formFields() { return this.addUserForm.controls; }

  showUsers() {
    this.dataService.getUsers().subscribe(
      resp => {
        this.all_users = resp;
      }
    );
  }

  addUser(formValue) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    else {
      let params = {
        name: formValue.name.toLowerCase()
      }
      let users = this.all_users.filter(item => item.name === params.name);
      if (users.length > 0) {
        let msg = users[0].name + ' is present in the list. Please try again with another name.';
        this.alertService.openModal(msg, 'Duplicate Name exist');
      }
      else {
        this.dataService.addUser(params).subscribe(
          resp => {
            this.alertService.openModal('Record added successfully', 'Success')
          },
          error => {
            // Show Error
            console.log('App service error handler: ' + error);
          }, () => {
            this.showUsers();
            this.addUserForm.reset();
            Object.keys(this.addUserForm.controls).forEach(key => {
              this.addUserForm.get(key).setErrors(null);
            });

            let settleup_param = {
              "name": params.name,
              "payto": []
            }
            this.dataService.addSettleUp(settleup_param).subscribe(
              resp => {
                //this.alertService.openModal('Record added successfully', 'Success')
              },
              error => {
                // Show Error
                console.log('App service error handler: ' + error);
              });

          });


      }

    }


  }

}
