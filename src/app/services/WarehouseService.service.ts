import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';
import { RegionDTO } from 'src/shared/Models/RegionDTO';

@Injectable({
  providedIn: 'root'
})
export class WarehouseServiceService {
  url: string;
  _appsettings: AppSettings;
  regioncode: number;
  selectedregioncode : number;
  provincecode: number;
  selectedprovincecode: number;
  municipalitycode: number;
  selectedmunicipalitycode: number;
  barangayCode: number;
  selectedbarangaycode: number;

  constructor(private http: HttpClient, private appsettings: AppSettings) { 
    this._appsettings = appsettings;
  }

  getWarehouse(){
    return this.http.get(this.appsettings.baseURL + 'EamisWarehouse/list');
  }
  
  findAll(link: string, size: number, index: number){
    this.url = link;
    let params = new HttpParams();
  
    params = params.append('Size', String(size));
    params = params.append('Index', String(index)); 
  
  
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }
  findRegion(link: string){
    this.url = link;
    let params = new HttpParams();
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }

  selectedbyRegion(trigger: any){
      this.selectedregioncode = trigger;
      console.log('this services is working', this.selectedregioncode);
  }

  findProvince(link: string, regioncode: number){
    this.url = link;
    let params = new HttpParams();

    params = params.append('regionCode', Number(regioncode));
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }

  selectedbyProvince(trigger:any){
    this.selectedprovincecode = trigger;
    console.log('this services is working', this.selectedprovincecode);
  }

  findMunicipality(link: string, provinceCode: number ){
    this.url = link;
    let params = new HttpParams();

    params = params.append('provinceCode', Number(provinceCode));
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }

  selectedbyMunicipality(trigger:any){
    this.selectedmunicipalitycode = trigger;
    console.log('this services is working', this.selectedmunicipalitycode);
  }

  findBarangay(link: string, municipalityCode: number){
    this.url = link;
    let params = new HttpParams();

    params = params.append('municipalityCode', Number(municipalityCode));
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }

  selectedbyBarangay(trigger:any){
    this.selectedbarangaycode = trigger;
    console.log('this services is working', this.selectedbarangaycode);
  }
  

  postWarehouse(link: string, data: any){
    this.url = link;
    return this.http.post(this.appsettings.baseURL + this.url, data);
  }

  updateWarehouse(link: string, id: number,data: any){
    const options = {
      
           body:{
            id: id,
            warehouse_description: data.warehouseDescription,
            street: data.street,
            barangay: data.barangay,
            municipality: data.municipality,
            region: data.region,
            provice: data.provice
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

  deleteWarehouse(data: any){
    return this.http.post(this.appsettings.baseURL + 'EamisWarehouse/Delete', data);
  }
}
