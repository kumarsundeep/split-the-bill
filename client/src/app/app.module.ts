import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { RestService } from './shared/services/rest/rest.service';
import { DataService } from './shared/services/data/data.service';
import { AlertService } from './shared/common/alert';
//import { AuthService } from './shared/services/auth/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './shared/layout/layout.module';

import { AppComponent } from './app.component';
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    RestService,
    DataService,
    AlertService
  ],
  entryComponents: [AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
