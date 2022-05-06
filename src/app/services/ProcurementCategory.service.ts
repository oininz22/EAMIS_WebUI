import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppSettings } from 'src/shared/appsettings';
import { PropertyItemsDTO } from 'src/shared/Models/PropertyItemsDTO';


@Injectable({
  providedIn: 'root'
})
export class ProcurementCategoryService {
  _appsettings: AppSettings;
  dataSource: any;
  item?:any;
  url: any;
  propertyItem: PropertyItemsDTO[] = [];
  _propertyItems = new BehaviorSubject<PropertyItemsDTO[]>([]);
  task = this._propertyItems.asObservable();

  
  constructor(private http: HttpClient, private appsettings: AppSettings) 
  { 
    this._appsettings = appsettings;
  }



  searchProcurementCategory(searchType: string, searchValue: string){
    let params = new HttpParams();
    params = params.append('SearchType', String(searchType));
    params = params.append('SearchValue', String(searchValue));
    return this.http.get(this.appsettings.baseURL + 'EamisProcurementCategory/SearchProcurementCategory', {params})
  }
 

  Search(searchType: string, searchValue: string){
    let params = new HttpParams();
    params = params.append('SearchType', String(searchType));
    params = params.append('SearchValue', String(searchValue));
    return this.http.get(this.appsettings.baseURL + 'EamisPropertyItems/PublicSearchPropertyItems', {params});
  }

  findAll(link: string, size: number, index: number){
    this.url = link;
    let params = new HttpParams();
  
    params = params.append('Size', String(size));
    params = params.append('Index', String(index)); 
  

    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;

  }
  
  postCategory(link: string, data: any): Observable<any>{
    //const url = this.appsettings
    this.url = link;
    return this.http.post<any>(this.appsettings.baseURL + this.url, data)
    .pipe(catchError(this.handleError));
  }

  handleError(error){
    return throwError(error.message || "Server Error");
  }


  updateCategory(link: string, id: number,data: any): Observable<any>{
    const options = {
      
           body:{
            id: id,
            procurementDescription: data.procurementDescription
           },
           header: new HttpHeaders({
            'Content-Type' : 'application/json',
          }),
        };
    this.url = link;
    // let params = new HttpParams();
    // params = params.append('Id', String(id));
    return this.http.put<any>(this.appsettings.baseURL + this.url+id, data)
    .pipe(catchError(this.handleError));
  }

  deleteCategory(id:number, data:any){
      const options = {
      
       body:{
        id: id,
        procurementDescription: ""
       },
       header: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    };
    console.log(options);
    return this.http.delete(this.appsettings.baseURL + 'EamisProcurementCategory/Delete', options);
  }
  // use this method to get List and for pagination


  

}
