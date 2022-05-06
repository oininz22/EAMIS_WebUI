import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/shared/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ChartofAccountServiceService {
  _appsettings: AppSettings;
  dataSource: any;
  url: any;
  classificationId : number;
  selectedClassificationId : number
  subClassificationId : number;
  selectedSubClassificationId : number
  classificationGroupId : number;
  selectedGroupClassificationId : number
  isInventoryItem: boolean;
  isActive: boolean;

  constructor(private http: HttpClient, private appsettings: AppSettings) 
  { 
    this._appsettings = appsettings;
  }

  chartOfAccountList(){
  
      return this.http.get(this.appsettings.baseURL + 'EamisChartofAccounts/list');
  
  }

  checkstatus(trigger:any): Boolean{
    if(trigger.checked){
      this.isInventoryItem = true;
      this.isActive = true;
      console.log(this.isInventoryItem,this.isActive);
    }
    
    else{ 
      this.isInventoryItem = false;
      this.isActive = false;
      console.log(this.isInventoryItem,this.isActive);
    }
     return this.isInventoryItem, this.isActive; 
  }

  findAll(link: string, size: number, index: number){
    this.url = link;
    let params = new HttpParams();
  
    params = params.append('Size', String(size));
    params = params.append('Index', String(index)); 
  
  
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  
  }

  findSubClassification(link: string, classificationId: number){
    this.url = link;
    let params = new HttpParams();
    params = params.append('ClassificationId', Number(classificationId));
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }

  findGroupClassification(link: string, classificationId: number,subClassificationId: number){
    this.url = link;
    let params = new HttpParams();
    params = params.append('ClassificationId', Number(classificationId));
    params = params.append('SubClassificationId', Number(subClassificationId));
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }
  
  
  postChartofAccounts(link: string, data: any){
    this.url = link;
    data.is_Inventory_Item = this.isInventoryItem;
    data.isActive = this.isActive;
    var x =  this.http.post(this.appsettings.baseURL + this.url, data);
    return x;
  }

  updateChartofAccounts(link: string, id: number, data: any){
    const options = {
      
           body:{
            id: data.id,
            groupId : data.groupId,
            objectCode : data.objectCode,
            accountCode : data.accountCode,
            isPartofInventroy : data.isPartofInventroy,
            isActive: data.isActive
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

  deleteChartofAccounts(data :any){
    return this.http.post(this.appsettings.baseURL + 'EamisChartofAccounts/Delete', data);
  }

  getClassification(){
    return this.http.get(this.appsettings.baseURL + 'EamisClassification/list');
  }

  selectedbyClassification(trigger:any){
    this.selectedClassificationId = trigger;
    console.log('this services classification is working', this.selectedClassificationId);
  }

  selectedbySubClassification(trigger:any){
    this.selectedSubClassificationId = trigger;
    console.log('this services subclassification is working', this.selectedSubClassificationId);
  }

  selectedbyGroupClassification(trigger:any){
    this.classificationGroupId = trigger;
    console.log('this services groupclassification is working', this.classificationGroupId);
  }


  findClassification(link: string){
    this.url = link;
    let params = new HttpParams();
    const res = this.http.get(this.appsettings.baseURL + this.url, {params});
    return res;
  }
}
