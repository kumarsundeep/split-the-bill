import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data/data.service';


@Component({
  selector: 'app-settleup',
  templateUrl: './settleup.component.html',
  styleUrls: ['./settleup.component.scss']
})
export class SettleupComponent implements OnInit {
  public all_users: any;
  public settleups: any;
  public user_name: any;
  public payto_details: any;
  public show_list: boolean = false;
  public no_debt: boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.showUsers();
  }
  showUsers() {
    this.dataService.getUsers().subscribe(
      resp => {
        this.all_users = resp;
      }
    );
  }
  showSettleUps(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.value == "") {
      this.show_list = false;
    }
    else {
      this.show_list = true;

      this.user_name = event.target.value;
      this.dataService.getSettleUps().subscribe(
        resp => {
          this.settleups = resp;
          let paytoList = this.settleups.filter(item => item.name === this.user_name);
          this.payto_details = paytoList[0].payto;
          if (this.payto_details.length > 0) this.no_debt = false;
          else this.no_debt = true;
        }
      );
    }

  }

}
