import { Injectable } from '@angular/core';

import { RestService } from '../rest/rest.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppConfig } from '../../app-config';
const appConfig = new AppConfig();

@Injectable()
export class DataService {
  private apiTypes: any;
  constructor(private restService: RestService, private authService: AuthService) {
    this.apiTypes = restService.apiTypes;
  }


  // All your data services get put post patch update delete here

  getUsers() {
    const url = appConfig.appUrl + `people`;
    return this.restService.getService(url, this.apiTypes.app);
  }
  addUser(data: any) {
    const url = `people`;
    return this.restService.postService(url, data, this.apiTypes.app);
  }
  getExpenses() {
    const url = appConfig.appUrl + `expenses`;
    return this.restService.getService(url, this.apiTypes.app);
  }
  addExpense(data: any) {
    const url = `expenses`;
    return this.restService.postService(url, data, this.apiTypes.app);
  }
  getSettleUps() {
    const url = appConfig.appUrl + `settleup`;
    return this.restService.getService(url, this.apiTypes.app);
  }
  // getSampleData(params) {
  //   const url = `/sample/data`;
  //   return this.restService.postService(url, params, this.apiTypes.app);
  // }
  // registerUser(data: any): Observable<any> {
  //   return this.restService.postService(appConfig.resgisterUrl, data, this.apiTypes.app);
  // }


}


