import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppSettings } from 'src/shared/appsettings';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {


  constructor(private http: HttpClient, private appsettings: AppSettings) { }


  postUser(data: any): Observable<any>{
    return this.http.post<any>(this.appsettings.baseURL + 'EamisUsers/register', data)
    .pipe(catchError(this.handleError));
  }

  handleError(err){
    console.log(err);
    return throwError(err);
  }
}
