import { SelectionModel } from '@angular/cdk/collections';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RequiredAttachmentService } from 'src/app/services/requiredattachment-modal.service';
import { AppSettings } from 'src/shared/appsettings';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requiredattachment-modal',
  templateUrl: './requiredattachment-modal.component.html',
  styleUrls: ['./requiredattachment-modal.component.css']
})
export class RequiredattachmentModalComponent implements OnInit { 
 dataSource:any = {
 };
 index:number;
 size:number;
 pageEvent: PageEvent;
 isAllChecked: boolean = false; 
 displayedColumns: string[] = ['ischeck','no', 'description', 'isrequired'];
  constructor(private router:Router,private dialogRef: MatDialogRef<RequiredattachmentModalComponent>,private requiredSvc:RequiredAttachmentService,private appsettings:AppSettings) { }
  ngOnInit() {
    this.getList();
    this.getList2();
    
    
  }
  
  getList(){
    this.dataSource = null;
    this.requiredSvc.RequiredAttachmentCheckList = null;
    return this.requiredSvc.findAll(this.appsettings.baseURL + "EamisRequiredAttachment/list", 5, 1).subscribe(response => {
      this.dataSource = response;
      this.requiredSvc.RequiredAttachmentCheckList = response;
      console.log(this.requiredSvc.RequiredAttachmentCheckList);
     
    });
  }
getList2(){
  return this.requiredSvc.getRequiredAttachmentOnly(this.requiredSvc.RequiredAttachmentCheckList,this.appsettings.baseURL +"EamisRequiredAttachment/list")
  .subscribe(response=>{
   this.requiredSvc.isRequired = response;
   console.log(this.requiredSvc.isRequired);
  });
}

  selectedItem(id:any,event:MatCheckbox){
    if(event.checked){
      this.requiredSvc.getSelectedItem(id,event);
      if(this.requiredSvc.isRequired.items.length == this.requiredSvc.CounterforAllRequiredOnList){
        this.isAllChecked = true;
        console.log(this.isAllChecked);
      }
    }
    else{
      this.requiredSvc.getUnselectedItem(id,event);
      if(this.requiredSvc.isRequired.items.length != this.requiredSvc.CounterforAllRequiredOnList){
      this.isAllChecked = false;
      }
    }
    
  }
 
  onSubmit(){
    this.dialogRef.close();
    this.router.navigate(["admin/transaction/property-details"]);

  }

  onPaginateChange(event: PageEvent ){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.requiredSvc.findAll(this.appsettings.baseURL + "EamisRequiredAttachment/list", size, index).pipe(first()).subscribe((response: MatTableDataSource<any>) => {
      this.dataSource = response;
      this.requiredSvc.RequiredAttachmentCheckList = response;
      console.log(this.dataSource);
    });
  }
  seletedAllItem(id:any,event:MatCheckbox){
    for(var i = 0; i > this.dataSource.length; i++)
    {
      this.dataSource[i].isAllChecked = this.isAllChecked;
    }
  }
  // updateAllComplete() {
  //   this.isAllChecked = this.dataSource != null && this.dataSource.every(t => t.completed);
  // }

}
