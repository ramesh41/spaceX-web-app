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
    const getspaceXMissionURL = this.getSpaceXLaunchEndPointURL(obj, getEndPointURL);
    return this.httpClient.get(getspaceXMissionURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network errors occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }

  private handleErr(error: Response){
     return throwError(error)
  } 

  getSpaceXLaunchEndPointURL(obj: any, url: string){
    if(obj.hasOwnProperty('launch_success') && obj.hasOwnProperty('landing_success') && obj.hasOwnProperty('launch_year')){
      url = url+environment.SUCCESSFUL_LAUNCHING_STATUS +obj.launch_success+ environment.SUCCESSFUL_LANDING_STATUS+obj.landing_success+ '&launch_year='+obj.launch_year;
    } else if(obj.hasOwnProperty('launch_success') && obj.hasOwnProperty('launch_year')){
      url = url+environment.SUCCESSFUL_LAUNCHING_STATUS+obj.launch_success+ environment.LAUNCHING_YEAR+obj.launch_year;
    } else if(obj.hasOwnProperty('landing_success') && obj.hasOwnProperty('launch_year')){
      url = url+environment.SUCCESSFUL_LANDING_STATUS+obj.landing_success+ environment.LAUNCHING_YEAR+obj.launch_year;
    } else if(obj.hasOwnProperty('launch_success') && obj.hasOwnProperty('landing_success')){
      url = url+environment.SUCCESSFUL_LAUNCHING_STATUS+obj.launch_success +environment.SUCCESSFUL_LANDING_STATUS+obj.landing_success;
    } else if(obj.hasOwnProperty('launch_year')){
      url = url+ environment.LAUNCHING_YEAR+obj.launch_year;
    } else if(obj.hasOwnProperty('launch_success')){
      url = url+ environment.SUCCESSFUL_LAUNCHING_STATUS+obj.launch_success;
    } else if(obj.hasOwnProperty('landing_success')){
      url = url+ environment.SUCCESSFUL_LANDING_STATUS+obj.landing_success;
    } else{
      url = url;
    }
    return url;
  }
}


