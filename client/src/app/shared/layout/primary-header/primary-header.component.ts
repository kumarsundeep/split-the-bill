import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PrimaryHeaderService } from './primary-header.service';
import { Subscription } from 'rxjs';
//import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-primary-header',
  templateUrl: './primary-header.component.html',
  styleUrls: ['./primary-header.component.scss']
})
export class PrimaryHeaderComponent implements OnInit, OnDestroy {
  public page_title: string = "";
  public subscriptions: Subscription[] = [];
  public uid: any;
  public cust_company: any;
  public cust_name: any;
  public cust_type: any;
  constructor(
    private primaryHeaderService: PrimaryHeaderService,
    //private authService: AuthService
  ) { }
  ngOnInit() {
    this.setPageTitle();//Setting up page title    
  }
  public setPageTitle() {
    this.subscriptions.push(this.primaryHeaderService.pageTitle.subscribe(value => this.page_title = value));
  }
  ngOnDestroy() {
    //Unsubscribing all subscriptions to avoid memory leak    
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}