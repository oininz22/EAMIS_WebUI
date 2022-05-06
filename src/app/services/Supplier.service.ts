import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
isActive: Boolean;
  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  getSupplier(){
    return this.http.get(this.appSettings.baseURL + 'EamisSupplier/list');
  }

  getSupplierList(size: number, index:number){
    let params = new HttpParams();
    params = params.append('Size', String(size));
    params = params.append('Index', String(index));
    return this.http.get(this.appSettings.baseURL + 'EamisSupplier/list', {params});

  }

  searchSupplier(searchValue: string){
    let params = new HttpParams();
    params = params.append('SearchValue', String(searchValue));
    return this.http.get(this.appSettings.baseURL + 'EamisSupplier/SearchSupplier', {params});
  }

  postSupplier(data: any){
    data.isActive = this.isActive;
    return this.http.post(this.appSettings.baseURL + 'EamisSupplier/Add', data);
  }

  updateSupplier(data: any){
    const options = {
      
           body:{
            id: data.id,
            companyName: data.companyName,
            companyAddress: data.companyAddress,
            companyDescription: data.companyDescription,
            contactPersonName: data.contactPersonName,
            contactPersonNumber: data.contactPersonNumber,
            isActive: data.isActive
           },
           header: new HttpHeaders({
            'Content-Type' : 'application/json',
          }),
        };
    // let params = new HttpParams();
    // params = params.append('Id', String(id));
   return this.http.put(this.appSettings.baseURL + 'EamisSupplier/Edit', data);
  }

  deleteSupplier(data:any){
    const options = {
    
    body:{
      id: data.id,
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyDescription: data.companyDescription,
      contactPersonName: data.contactPersonName,
      contactPersonNumber: data.contactPersonNumber,
      isActive: data.isActive

    },
    header: new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };
  console.log(options);
  return this.http.delete(this.appSettings.baseURL + 'EamisSupplier/Delete', options);
}

  checkSupplier(trigger: any): Boolean{
    if(trigger.checked){
      this.isActive = true;
  
    }else{ 
      this.isActive = false;
    }
     return this.isActive; 
  }


}
