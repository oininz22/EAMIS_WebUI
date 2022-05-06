import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class PreconditionsService {
  _appsettings: AppSettings;
  dataSource: any;
  item?:any;
  url: any;

  constructor(private http: HttpClient, private appsettings: AppSettings) 
  { 
    this._appsettings = appsettings;
  }

  getPreconditions(): Observable<any>{
    return this.http.get(this.appsettings.baseURL + '/api/EamisPreconditions/list',this.item);
  }

  postPreconditions(link: string, data: any){
    this.url = link;
    return this.http.post(this.appsettings.baseURL + this.url, data);
  }

  updatePreconditions(link: string, id: number, parentid: number,data: any){
    const options = {
      
           body:{
            id: id,
            parentid: parentid,
            Description: data.Description
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

  deletePreconditions(data: any){
    return this.http.post(this.appsettings.baseURL + 'EamisPreconditions/Delete', data);
  }

//   deletePreconditions(id:number, data:any){
//     const options = {
    
//      body:{
//       id: id,
//       parent_Id: 0,
//       precondition_Description: ""
//      },
//      header: new HttpHeaders({
//       'Content-Type' : 'application/json',
//     }),
//   };
//   console.log(options);
//   var x = this.http.post(this.appsettings.baseURL + 'EamisPreconditions/Delete', options);
//   console.log(x);
//   return x;
// }

// use this method to get List and for pagination
findAll(link: string, size: number, index: number){
  this.url = link;
  let params = new HttpParams();

  params = params.append('Size', String(size));
  params = params.append('Index', String(index)); 


  const res = this.http.get(this.appsettings.baseURL + this.url, {params});
  return res;

}

}
