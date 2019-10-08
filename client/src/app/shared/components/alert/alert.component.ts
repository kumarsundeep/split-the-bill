import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  modalTitle: string;
  public closeBtnName: string;
  public messageList = [];
  public onClose: Subject<boolean>;

  constructor() { }

  ngOnInit() {
    this.onClose = new Subject();
  }
  confirm() {
    this.onClose.next(true);
  }

  // For not --- can be used in future
  decline() {
    this.onClose.next(false);
  }

}
