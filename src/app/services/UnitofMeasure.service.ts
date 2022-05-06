import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class UnitofMeasureService {
  url: string;
  _appsettings: AppSettings;

  constructor(private http: HttpClient, private appsettings: AppSettings) { 
    this._appsettings = appsettings;
  }

  getUomList(){
    return this.http.get(this.appsettings.baseURL + 'EamisUnitofMeasure/list');
  }
  
  findAll(link: string, size: number, index: number){
    this.url = link;
    let params = new HttpParams();
  
    params = params.append('Size', String(size));
    params = params.append('Index', String(index)); 
  
  
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  
  }

  postUnitMeasure(link: string, data: any){
    this.url = link;
    return this.http.post(this.appsettings.baseURL + this.url, data);
  }

  updateUnitMeasure(link: string, id: number, parentid: number,data: any){
    const options = {
      
           body:{
            id: id,
            parentid: parentid,
            Description: data.unitofMeasure
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

  deleteUnitMeasure(data: any){
    return this.http.post(this.appsettings.baseURL + 'EamisUnitofMeasure/Delete', data);
  }
}
