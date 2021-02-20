import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment} from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class SpaceXDataService {
  public myData = [];
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  changeMessage(obj: any) {
    this.messageSource.next(obj)
  }

  getSpaceLaunchData(obj: any){
    let getEndPointURL: string = environment.SPACE_X_LAUNCH_MISSION_URL;
    const getspaceXMissionURL = this.getF(obj, getEndPointURL);
    return this.httpClient.get(getspaceXMissionURL);
  }
  private handleErr(error: Response){
     return throwError(error)
  } 
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getF(obj: any, url: string){
    if(obj.hasOwnProperty('launching') && obj.hasOwnProperty('landing') && obj.hasOwnProperty('year')){
      url = url+environment.SUCCESSFUL_LAUNCHING_STATUS +obj.launching+ environment.SUCCESSFUL_LANDING_STATUS+obj.landing+ '&launch_year='+obj.year;
    } else if(obj.hasOwnProperty('launching') && obj.hasOwnProperty('year')){
      url = url+environment.SUCCESSFUL_LAUNCHING_STATUS+obj.launching+ environment.LAUNCHING_YEAR+obj.year;
    } else if(obj.hasOwnProperty('landing') && obj.hasOwnProperty('year')){
      url = url+environment.SUCCESSFUL_LANDING_STATUS+obj.landing+ environment.LAUNCHING_YEAR+obj.year;
    } else if(obj.hasOwnProperty('launching') && obj.hasOwnProperty('landing')){
      url = url+environment.SUCCESSFUL_LAUNCHING_STATUS+obj.launching +environment.SUCCESSFUL_LANDING_STATUS+obj.landing;
    } else if(obj.hasOwnProperty('year')){
      url = url+ environment.LAUNCHING_YEAR+obj.year;
    } else if(obj.hasOwnProperty('launching')){
      url = url+ environment.SUCCESSFUL_LAUNCHING_STATUS+obj.launching;
    } else if(obj.hasOwnProperty('landing')){
      url = url+ environment.SUCCESSFUL_LANDING_STATUS+obj.landing;
    } else{
      url = url;
    }
    return url;
  }
}


