import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class RoleManagerService {
  _appsettings: AppSettings;
  dataSource: any;
  item?:any;
  isdeleted : boolean;
  url: any;

  constructor(private http: HttpClient, private appsettings: AppSettings) {
    this._appsettings = appsettings;
   }

   check(trigger:any): Boolean{
    if(trigger.checked){
      this.isdeleted = true;
      console.log(this.isdeleted);
    }
    
    else{ 
      this.isdeleted = false;
      console.log(this.isdeleted);
    }
     return this.isdeleted; 
  }

  findAll(link: string, size: number, index: number){
    this.url = link;
    let params = new HttpParams();
  
    params = params.append('Size', String(size));
    params = params.append('Index', String(index)); 
  
  
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  
  }
  deleteRoleManager(data: any){
    return this.http.post(this.appsettings.baseURL + 'EamisRoles/Delete', data);
  }

  postRoleManager(link: string, data: any){
    this.url = link;
    data.is_Deleted = this.isdeleted;
    var x =  this.http.post(this.appsettings.baseURL + this.url, data);
    return x;
  }

  updateRoleManager(link: string, id: number, data: any){
    const options = {
      
           body:{
            id: id,
            role_Name: data.role_Name,
            is_Deleted: this.isdeleted
           },
           header: new HttpHeaders({
            'Content-Type' : 'application/json',
          }),
        };
    this.url = link;
    // let params = new HttpParams();
    // params = params.append('Id', String(id));
    var x = this.http.put(this.appsettings.baseURL + this.url+id, data);
    console.log(x);
    return x;
  }
}

