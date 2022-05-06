import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  getUser(size: number, index: number){
    let params = new HttpParams();
    params = params.append('Size', String(size));
    params = params.append('Index', String(index));
    return this.http.get(this.appSettings.baseURL + 'EamisUsers/publicsearch', {params});
  }
}
