import { Injectable } from '@angular/core';
import { AppConfig } from '../../app-config';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LoaderService } from '../loader/loader';



const appConfig = new AppConfig();

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private headers: HttpHeaders;
  public apiTypes = {
    'auth': 'auth',
    'app': 'app'
  };


  constructor(private http: HttpClient, private loaderService: LoaderService) {
    // this.pushHeaders();
  }
  public pushHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });
    // this.options = new RequestOptions({ headers: this.headers });
    // this.optionsDelete = new RequestOptions({ headers: this.headers });
  }

  // Get Call
  public getService(url: string, isAuth?: string): Observable<any> {
    // const _url = appConfig.appUrl + url;
    // show loader
    this.loaderService.show();
    return this.http
      .get(url)
      .pipe(
        map(this.fromResponse),
        catchError(this.catchServerError),
        finalize(() => {
          // hide loader
          this.loaderService.hide();
        })
      );
  }

  // Whole Update
  public putService(url: string, param: any, isAuth?: string): Observable<any> {
    const body = JSON.stringify(param);
    const _url = isAuth === this.apiTypes.auth ? appConfig.appAuthUrl + url : appConfig.appUrl + url;
    // show loader
    return this.http
      .put(_url, body)
      .pipe(
        map(this.fromResponse),
        catchError(this.catchServerError),
        finalize(() => {
          // hide loader
        })
      );
  }

  // Post Call
  public postService(url: string, param: any, isAuth?: string): Observable<any> {
    // const body = JSON.stringify(param);
    const body = param;
    const _url = isAuth === this.apiTypes.auth ? appConfig.appAuthUrl + url : appConfig.appUrl + url;
    // show loader
    return this.http
      .post(_url, body)
      .pipe(
        map(this.fromResponse),
        catchError(this.catchServerError),
        finalize(() => {
          // hide loader
        })
      );

  }


  // All delete
  public deleteService(url: string, param: any, isAuth?: string): Observable<any> {
    const body = JSON.stringify(param);
    const params: URLSearchParams = new URLSearchParams();
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        const val = param[key];
        params.set(key, val);
      }
    }
    // this.optionsDelete = new RequestOptions({ headers: this.headers, search: params, body: body }); //  ======change
    const _url = isAuth === this.apiTypes.auth ? appConfig.appAuthUrl + url : appConfig.appUrl + url;
    // show loader
    return this.http
      .delete(_url)
      .pipe(
        map(this.fromResponse),
        catchError(this.catchServerError),
        finalize(() => {
          // hide loader
        })
      );
  }

  // Individual Delete
  public deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
    /// show loader
    return this.http
      .delete(appConfig.appUrl + url + '/?' + key + '=' + val)
      .pipe(
        map(this.fromResponse),
        catchError(this.catchServerError),
        finalize(() => {
          // hide loader
        })
      );
  }


  // Update all
  public updateService(url: string, param: any, isAuth?: string): Observable<any> {
    const body = JSON.stringify(param);
    const _url = isAuth === this.apiTypes.auth ? appConfig.appAuthUrl + url : appConfig.appUrl + url;
    // show loader
    return this.http
      .put(_url, body)
      .pipe(
        map(this.fromResponse),
        catchError(this.catchServerError),
        finalize(() => {
          // hide loader
        })
      );
  }

  // Update partial
  public patchService(url: string, param: any, isAuth?: string): Observable<any> {
    const body = param;
    const _url = isAuth === this.apiTypes.auth ? appConfig.appAuthUrl + url : appConfig.appUrl + url;
    // show loader
    return this.http
      .patch(appConfig.appUrl + _url, body)
      .pipe(
        map(this.fromResponse),
        catchError(this.catchServerError),
        finalize(() => {
          // hide loader
        })
      );
  }


  // Data from Response
  public fromResponse(response) {
    return response;
  }

  // Catching errors
  public catchServerError(errors: any) {
    const errorMsg = 'Something went wrong on Server!';
    console.error(errorMsg);
    return throwError(errorMsg);

    // return Observable.throwError(errorMsg);
  }




}

