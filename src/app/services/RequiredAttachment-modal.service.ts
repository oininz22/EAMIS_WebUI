import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";
import { Injectable } from "@angular/core";
import { AppSettings } from "src/shared/appsettings";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
  })
  export class RequiredAttachmentService{
    

    constructor(private http: HttpClient, private appsettings: AppSettings){}
    RequiredAttachmentCheckList:any;
    isRequired:any;
    isRequiredOnly = false;
    AttachmentCheckedList:Array<any> = [];
    CounterforAllRequiredOnList = 0;
    selection:SelectionModel<any> = new SelectionModel();
    
    link = "EamisRequiredAttachment/list";
    getRequiredAttachmentList(url:any,size:number,index:number){
    
      const params = new HttpParams();
      params.set('size',size);
      params.set('index',index);

        return this.http.get(this.appsettings.baseURL + this.link,{params:params});
    }
    
  findAll(url:string,size: number, index: number){
    url = this.link;
    let params = new HttpParams();
  
    params = params.append('Size', String(size));
    params = params.append('Index', String(index)); 
  

    const res = this.http.get(this.appsettings.baseURL + url, {params});
    return res;

  }

    getSelectedItem(id:any,item:any){
      item = this.RequiredAttachmentCheckList.items;
      var x = item.find(x=>x.id === id);
      if(x.is_Required == true){
        console.log("This log must be added to a list");
        this.selection.select(x);
        this.AttachmentCheckedList.push(x);
        this.CounterforAllRequiredOnList++;
      }
      else
      {
        console.log("This is not required in list");
        this.selection.select(x);
        this.AttachmentCheckedList.push(x);
      }
      
      // this.AttachmentCheckedList.sort((a,b) => (a.is_Required) - (b.is_Required));
     
      console.log(this.AttachmentCheckedList);
    }

    isSelected(row){
      for(let s of this.selection.selected){
        if(s.id == row.id)
        return true;
      }
    }

    getRequiredAttachmentOnly(item:any,url:string){
      url = this.link;
      let params = new HttpParams();
    
      params = params.append('is_Required', Boolean(true));
      const res = this.http.get(this.appsettings.baseURL + url, {params});
      return res;
     
    }
    getUnselectedItem(id:any,item:any){
      var x = this.AttachmentCheckedList.find(x=>x.id === id);
      var y =  this.AttachmentCheckedList.splice(this.AttachmentCheckedList.indexOf(x),1);
      this.CounterforAllRequiredOnList--;
     console.log(this.AttachmentCheckedList);
    }

  }