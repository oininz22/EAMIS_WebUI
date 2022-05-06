import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {
isSerialized: Boolean;
isStockable: Boolean;
isSupplies: Boolean;
isAsset: Boolean;
isActive: Boolean;
depreciationMethond: string;


  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  getItemCategoryAIS(size: number, index: number){
    let params = new HttpParams();
    params = params.append('Size', String(size));
    params = params.append('Index', String(index));
    return this.http.get(this.appSettings.baseURL + 'EamisItemCategory/MapToDTOList', {params});
  }

  searchItemCategory(searchValue: string){
    let params = new HttpParams();
    params = params.append('SearchValue', String(searchValue));
    return this.http.get(this.appSettings.baseURL + 'EamisItemCategory/SearchItemCategory', {params});

  }

  getItemCategory(isActive: Boolean){
    let params = new HttpParams();
    params = params.append('isActive', String(isActive));
    return this.http.get(this.appSettings.baseURL + 'EamisItemCategory/list', {params});
  }

  getItemCategories(){
    return this.http.get(this.appSettings.baseURL + 'EamisItemCategory/list');
  }

  getItemCategoryList(size: number, index: number){
    let params = new HttpParams();
    params = params.append('Size', String(size));
    params = params.append('Index', String(index));
    return this.http.get(this.appSettings.baseURL + 'EamisItemCategory/list', {params});

  }

  postItemCategory(data: any): Observable<any>{
    data.isSerialized = this.isSerialized;
    data.isStockable = this.isStockable;
    return this.http.post<any>(this.appSettings.baseURL + 'EamisItemCategory/Add', data)
    .pipe(catchError(this.handleError));
  }

  handleError(error){
    return throwError(error.message || "Server Error")
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
   return this.http.put(this.appSettings.baseURL + 'EamisItemCategory/Edit', data)
   .pipe(catchError(this.handleError));

  
  }

  deleteItemCategory(id:number, data:any){
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
    return this.http.delete(this.appSettings.baseURL + 'EamisItemCategory/Delete', options);
  }

  checkSupplies(trigger: any): Boolean{
    if(trigger.checked){
      this.isSupplies = true;
      this.depreciationMethond = null
    }else{
      this.isSupplies = false;
      this.depreciationMethond = "Straight Line (Default)"
    }
    return this.isSupplies;
  }

  checkAsset(trigger: any): Boolean{
    if(trigger.checked){
      this.isAsset = true;
    }else{
      this.isAsset = false;
    }
    return this.isAsset;
  }

  checkSerialized(trigger: any): Boolean{
    if(trigger.checked){
      this.isSerialized = true;
  
    }else{ 
      this.isSerialized = false;
    }
     return this.isSerialized; 
  }

  checkStockable(trigger: any): Boolean{
    if(trigger.checked){
      this.isStockable = true;
    }else{
      this.isStockable = false;
    }
    return this.isStockable;
  }

  checkActive(trigger: any): Boolean{
    if(trigger.checked){
      this.isActive = true;
    }else{
      this.isActive = false;
    }
    return this.isActive;
  }

  getAisOffice(){
    return this.http.get(this.appSettings.baseURL + 'AisOffice/list');
  }


}
