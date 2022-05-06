import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentalAspectsService {

  constructor(private http: HttpClient, private appsettings: AppSettings) { }


  getAspectsList(size: number, index: number){
    let params = new HttpParams();

    params = params.append('Size', String(size));
    params = params.append('Index', String(index));

    return this.http.get(this.appsettings.baseURL + 'EamisEnvironmentalAspects/list', {params});
  }
}
