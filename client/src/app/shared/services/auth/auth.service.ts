/**
 * Place to auth whole app
 */
import { Injectable } from '@angular/core';
// import {RestService} from '../rest/rest.service';
import { RestService } from '../rest/rest.service';
// import { AppConfig } from '../../app-config';



// const appConfig = new AppConfig();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiTypes: any;
  constructor(private restService: RestService) {
    this.apiTypes = restService.apiTypes;
  }
  /**
   * Place to auth whole app services, methods etc.
   */

}
