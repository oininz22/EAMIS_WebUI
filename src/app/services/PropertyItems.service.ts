import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class PropertyItemsService {
isActive: Boolean;
  constructor(private http: HttpClient, private appsettings: AppSettings)
  {

  }


  searchProperty(searchValue: string){
    let params = new HttpParams();
    // params = params.append('SearchType', String(searchType));
    params = params.append('SearchValue', String(searchValue));
    return this.http.get(this.appsettings.baseURL + 'EamisPropertyItems/PublicSearchPropertyItems', {params})
  }

  getProperty(){
    // let params = new HttpParams();
    // params = params.append('SearchType', String(searchType));
    // params = params.append('SearchValue', String(searchValue));
    return this.http.get(this.appsettings.baseURL+ 'EamisPropertyItems/list');
  }

  checkActivated(trigger: any): Boolean{
    if(trigger.checked){
      this.isActive = true;
  
    }else{ 
      this.isActive = false;
    }
     return this.isActive; 
  }

  getPropertyList(size: number, index: number){

    let params = new HttpParams();

    params = params.append('Size', String(size));
    params = params.append('Index', String(index));


    const res = this.http.get(this.appsettings.baseURL + 'EamisPropertyItems/list', {params});
    return res;


  }

  postProperty(data: any){
    return this.http.post(this.appsettings.baseURL + 'EamisPropertyItems/Add', data);
  }

  updateProperty(id: number,data: any){
    const options = {

           body:{
            id: id,
            parentId: data.parentId,
            propertyItemCode: data.propertyItemCode,
            propertyItemName: data.propertyItemName
           },
           header: new HttpHeaders({
            'Content-Type' : 'application/json',
          }),
        };

    // let params = new HttpParams();
    // params = params.append('Id', String(id));
    var tae = this.http.put(this.appsettings.baseURL + 'EamisPropertyItems/Edit?Id='+id, data);
    console.log(tae);
    return tae;
  }

  deleteProperty(id:number, data:any){
    const options = {

     body:{
      id: id,
      propertyItemCode: "",
      propertyItemName: ""
     },
     header: new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };
  console.log(options);
  return this.http.delete(this.appsettings.baseURL + 'EamisPropertyItems/Delete', options);
}
}
