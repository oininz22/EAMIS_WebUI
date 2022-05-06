import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class RequiredAttachmentService {
  _appsettings: AppSettings;
  dataSource: any;
  item?:any;
  url: any;
  isrequired : boolean;
 
  constructor(private http: HttpClient, private appsettings: AppSettings) 
  { 
    this._appsettings = appsettings;
  }

  findAll(link: string, size: number, index: number){
    this.url = link;
    let params = new HttpParams();
  
    params = params.append('Size', String(size));
    params = params.append('Index', String(index)); 
  
  
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  
  }

  deleteRequiredAttachment(data: any){
    return this.http.post(this.appsettings.baseURL + 'EamisAttachments/Delete', data);
  }

  postRequiredAttachment(link: string, data: any){
    this.url = link;
    data.is_Required = this.isrequired;
    var x =  this.http.post(this.appsettings.baseURL + this.url, data);
    return x;
  }

  check(trigger:any): Boolean{
    if(trigger.checked){
      this.isrequired = true;
      console.log(this.isrequired);
    }
    
    else{ 
      this.isrequired = false;
      console.log(this.isrequired);
    }
     return this.isrequired; 
  }

  updateRequiredAttachment(link: string, id: number, data: any){
    const options = {
      
           body:{
            id: id,
            attachmentDescription: data.attachmentDescription,
            is_Required: this.isrequired
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

  getRequiredAttachment(): Observable<any>{
    return this.http.get(this.appsettings.baseURL + '/api/EamisAttachments/list',this.item);
  }
}
