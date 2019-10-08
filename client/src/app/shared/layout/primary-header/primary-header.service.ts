import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrimaryHeaderService {
  public pageTitle: BehaviorSubject<any> = new BehaviorSubject<any>(" ");
  constructor() {
  }
}