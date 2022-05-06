import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ItemSubCategoryService {



  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  searchItemSubCategory(type: string, searchValue: string){
    let params = new HttpParams();
    params = params.append('type', String(type));
    params = params.append('searchValue', String(searchValue));
    return this.http.get(this.appSettings.baseURL + 'EamisItemSubCategory/SearchItemSubCategory', {params});

  }

  getItemSubCategoryList(size: number, index: number){
    let params = new HttpParams();
    params = params.append('Size', String(size));
    params = params.append('Index', String(index));
    return this.http.get(this.appSettings.baseURL + 'EamisItemSubCategory/list', {params});

  }

  getItemSubCategoryByCategory(categoryId: number){
    let params = new HttpParams();
    params = params.append('CategoryId', String(categoryId))
    return this.http.get(this.appSettings.baseURL + 'EamisItemSubCategory/list', {params});
  }

  postItemSubCategory(data: any): Observable<any>{
    const url = this.appSettings.baseURL + 'EamisItemSubCategory/Add'
    return this.http.post<any>(url, data)
    .pipe(catchError(this.handleError));
  
    //return this.http.post(this.appSettings.baseURL + 'EamisItemSubCategory/Add', data);
  }

  handleError(error){
    return throwError(error.message || "Server Error");
  }

  updateItemCategory(data: any): Observable<any>{
    const options = {
      
           body:{
            id: data.id,
            categoryName: data.categoryName,
            accountCode: data.accountCode,
            costMethod: data.costMethod,
            depreciationMethod: data.depreciationMethod,
            estimatedLife: data.estimatedLife,
            isSerialized: data.isSerialized,
            isStockable: data.isStockable,
            responsibilityCode: data.responsibilityCode
           },
           header: new HttpHeaders({
            'Content-Type' : 'application/json',
          }),
        };
    // let params = new HttpParams();
    // params = params.append('Id', String(id));
   return this.http.put<any>(this.appSettings.baseURL + 'EamisItemSubCategory/Edit', data)
   .pipe(catchError(this.handleError));

  
  }

  deleteItemSubCategory(id:number, data:any){
      const options = {
      
      body:{
        id: id,
        categoryName: data.categoryName,
        accountCode: data.accountCode,
        costMethod: data.costMethod,
        depreciationMethod: data.depreciationMethod,
        estimatedLife: data.estimatedLife,
        isSerialized: data.isSerialized,
        isStockable: data.isStockable,
        responsibilityCode: data.responsibilityCode

      },
      header: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    };
    console.log(options);
    return this.http.delete(this.appSettings.baseURL + 'EamisItemSubCategory/Delete', options);
  }
  
}
