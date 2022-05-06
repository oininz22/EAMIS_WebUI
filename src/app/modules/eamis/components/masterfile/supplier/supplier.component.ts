import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { SupplierService } from 'src/app/services/supplier.service';
import { SupplierDTO } from 'src/shared/Models/SupplierDTO';
import Swal from 'sweetalert2';
import { SupplierDialogComponent } from '../../mat-dialog/supplier-dialog/supplier-dialog.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
supplier: SupplierDTO[] = [];
object: any;
pageEvent: PageEvent;
dataSource: Observable<SupplierDTO[]>;
filterValue: any;
displayedColumns: string[] = ['companyName', 'companyAddress', 'companyDescription', 'contactPersonName', 
'contactPersonNumber', 'isActive', 'actions'];
searchControl = new FormControl();
  constructor(private microSvc: SupplierService, private dialog: MatDialog) { }

  ngOnInit(){
    this.getList();
    this.dataSource = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.companyName)),
      map(companyName => (companyName ? this._filter(companyName) : this.supplier.slice())),
    );
    
  }

  valueChange(){
    if(this.searchControl.value === ''){
      this.getList();
    }
  }

  

  displayFn(user: SupplierDTO) : string {
    return user && user.companyName ? user.companyName : '';
  }


  public _filter(companyName: string): SupplierDTO[] {
    this.filterValue = companyName.toLowerCase();
      if(this.searchControl.value == ''){
       this.getList();
     }else{
       this.getFilter();
     }
  
   return this.supplier.filter(option => option.companyName.toLowerCase().includes(this.filterValue));
 }

 getFilter(){
  this.microSvc.searchSupplier(this.filterValue).subscribe((response: SupplierDTO) => {
    this.object = response;
      this.supplier = JSON.parse(JSON.stringify(this.object.items));
  });
}


  getList(){
    this.microSvc.getSupplierList(5, 1).subscribe((response: SupplierDTO) => {
      this.object = response;
      this.supplier = JSON.parse(JSON.stringify(this.object.items))
    })
  }


  openDialog(){
    this.dialog.open(SupplierDialogComponent)
    .afterClosed().subscribe(response => {
      if(response === 'save'){
        this.getList();
        
      }
    });
  }

  editSupplier(element: any){
    this.dialog.open(SupplierDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.microSvc.getSupplierList(size, index).pipe(first()).subscribe((response: SupplierDTO) => {
      this.object = response;
      this.supplier = JSON.parse(JSON.stringify(this.object.items));
    });
  }

  deleteSupplier(element: any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 400
    }).then((result) => {
      if(result.isConfirmed){
        this.microSvc.deleteSupplier(element)
        .subscribe(response => {
          this.getList();  
          
        })
        Swal.fire({
          title: 'Deleted!',
          text: 'Your data has been deleted.',
          icon: 'success',
          heightAuto: false,
          width: 400
        })
      }else{
        this.getList();
      }
    })
    
  }

}
