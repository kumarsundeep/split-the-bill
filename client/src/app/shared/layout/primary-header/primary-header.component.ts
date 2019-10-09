import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-primary-header',
  templateUrl: './primary-header.component.html',
  styleUrls: ['./primary-header.component.scss']
})
export class PrimaryHeaderComponent implements OnInit {
  public navbarOpen: boolean = false;
  constructor() { }
  ngOnInit() {

  }
  public toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}