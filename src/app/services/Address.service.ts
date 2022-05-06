import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient, private appsettings: AppSettings) { }

  findRegion(){
    // this.url = link;
    // let params = new HttpParams();
    const res = this.http.get(this.appsettings.baseURL + 'EamisRegion/list');
    return res;
  }
  
  findProvince(regioncode: string){
    let params = new HttpParams();
    params = params.append('regionCode', String(regioncode));
    const res = this.http.get(this.appsettings.baseURL + 'EamisProvince/list', {params});
    return res;
  }
  
  findMunicipality(provinceCode: string ){

    let params = new HttpParams();

    params = params.append('provinceCode', String(provinceCode));
    const res = this.http.get(this.appsettings.baseURL + 'EamisMunicipality/list', {params});
    return res;
  }
  
  findBarangay(municipalityCode: string){

    let params = new HttpParams();

    params = params.append('municipalityCode', String(municipalityCode));
    const res = this.http.get(this.appsettings.baseURL + 'EamisBarangay/list', {params});
    return res;
  }

}
