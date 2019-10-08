import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoaderService} from '../../services/loader/loader';
import {LoaderState} from '../../interfaces/loader/loader';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader-component.component.html',
  styleUrls: ['./loader-component.component.scss']
})
export class LoaderComponentComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
