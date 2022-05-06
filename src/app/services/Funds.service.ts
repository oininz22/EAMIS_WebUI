import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppSettings } from 'src/shared/appsettings';
import { FundsDTO } from 'src/shared/Models/FundsDTO';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FundsService {
isActive: Boolean;
funding: FundsDTO;
  constructor(private http: HttpClient, private appSettings: AppSettings) { }


  searchFunds(type: string, searchValue: string)
  {
    let params = new HttpParams();
    params = params.append('type', String(type));
    params = params.append('searchValue', String(searchValue));
    return this.http.get(this.appSettings.baseURL + 'EamisFundSource/Search', {params});
  }
  
  getAllFunds(size: number, index: number){
    let params = new HttpParams();
    params = params.append('Size', String(size));
    params = params.append('Index', String(index));
    return this.http.get(this.appSettings.baseURL + 'EamisFundSource/list', {params});
  }

  getFinancingSource(){
    return this.http.get(this.appSettings.baseURL + 'EamisFinancingSource/list');
  }

  getAuthorization(){
    return this.http.get(this.appSettings.baseURL + "EamisAuthorization/list");
  }

  getGeneralFund(){
    return this.http.get(this.appSettings.baseURL + 'EamisGeneralFundSource/list');
  }

  // postFundSource(data: any){
  //   return this.http.post(this.appSettings.baseURL + 'EamisFundSource/Add', data)

  // }

  postFundSource(data: any): Observable<any>{
    const url = this.appSettings.baseURL + 'EamisFundSource/Add'

    return this.http.post<any>(url, data)
    .pipe(catchError(this.handleError))
  }

  handleError(error){
    return throwError(error.message || "Server Error");
  }
  

  editFundSource(data: any){
    const url = this.appSettings.baseURL + 'EamisFundSource/Edit'

    return this.http.put<any>(url, data)
    .pipe(catchError(this.handleError))
    // const options = {
    //   body: {
    //     id: data.id,
    //     genFundId: data.genFundId,
    //     code: data.code,
    //     financingSourceId: data.financingSourceId,
    //     authorizationId: data.authorizationId,
    //     fundCategory: data.fundCategory,
    //     isActive: data.isActive
    //   }
    // }

    //return this.http.put(this.appSettings.baseURL + 'EamisFundSource/Edit', data);
  }

  deleteFundSource(data: any){
    const options = {
      body: {
        id: data.id
      }
    }
    return this.http.delete(this.appSettings.baseURL + 'EamisFundSource/Delete', options);
  }

  checkIsActive(trigger: any): Boolean{
    if (trigger.checked){
      this.isActive = true;
    }else{
      this.isActive = false;
    }
    return this.isActive;
  }
}
