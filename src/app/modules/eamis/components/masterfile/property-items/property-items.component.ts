import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { PropertyItemsService } from 'src/app/services/PropertyItems.service';
import { AppSettings } from 'src/shared/appsettings';
import { PropertyItemsDTO } from 'src/shared/Models/PropertyItemsDTO';
import Swal from 'sweetalert2';
import { PropertyItemsDialogComponent } from '../../mat-dialog/property-items-dialog/property-items-dialog.component';



@Component({
  selector: 'app-property-items',
  templateUrl: './property-items.component.html',
  styleUrls: ['./property-items.component.css']
})
export class PropertyItemsComponent implements OnInit {

propertyItem: PropertyItemsDTO[] = [];
displayedColumns: string[] = ['propertyNo', 'propertyName', 'unitOfMeasure', 'appNo', 'brand',  
'model', 'quantityInStock', 'warehouse', 'supplier', 'active', 'actions'];
dataSource: Observable<PropertyItemsDTO[]>;
pageEvent: PageEvent;
add: any;
propertyItemObject: any;
searchControl = new FormControl();
filterValue: any;


  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: PropertyItemsService, private dialog: MatDialog) { 
    // this.http.get(this.appsettings.baseURL + 'EamisPropertyItems/list')
    // .subscribe((response: PropertyItemsDTO) => {
    //   this.propertyItem = response;
    //   console.log(this.propertyItem);
    // });
  }

  ngOnInit(){
    this.getList();

    this.dataSource = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.propertyName)),
      map(propertyName => (propertyName ? this._filter(propertyName) : this.propertyItem.slice())),
    );
  
  }

  valueChange(){
    if(this.searchControl.value === ''){
      this.getList();
    }
  }

  displayFn(user: PropertyItemsDTO) : string {
    return user && user.propertyName ? user.propertyName : '';
  }

  public _filter(propertyName: string): PropertyItemsDTO[] {
    this.filterValue = propertyName.toLowerCase();
      if(this.searchControl.value == ''){
       this.getList();
     }else{
       this.getFilter();
     }
  
   return this.propertyItem.filter(option => option.propertyName.toLowerCase().includes(this.filterValue));
 }

 getFilter(){
  this.MicroSvc.searchProperty(this.filterValue).subscribe((response: PropertyItemsDTO) => {
    this.propertyItemObject = response;
      this.propertyItem = JSON.parse(JSON.stringify(this.propertyItemObject.items));
      
  });
}

  openDialog(){
    this.dialog.open(PropertyItemsDialogComponent)
    .afterClosed().subscribe(response => {
      this.add = response;
      if (response === 'save'){
        this.getList();
      }
    })
  }

  editProperty(element: any){
    this.dialog.open(PropertyItemsDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if (val === 'update'){
        this.getList();
      }
    })
  }

  deleteProperty(id: number, element: any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed){
        this.MicroSvc.deleteProperty(id, element)
        .subscribe(response => {
          this.getList();
        })
        Swal.fire({
          title: 'Deleted!',
          text: "Your file has been deleted.",
          icon: 'success',
          heightAuto: false
        })
      }else{
        this.getList();
      }
    })
  }

  getList() {
    this.MicroSvc.getPropertyList(5, 1).pipe(first()).subscribe((response: PropertyItemsDTO) => {
      this.propertyItemObject = response;
      this.propertyItem = JSON.parse(JSON.stringify(this.propertyItemObject.items));
    })
  }

  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.getPropertyList(size, index).pipe(first()).subscribe((response: PropertyItemsDTO) => {
      this.propertyItemObject = response;
      this.propertyItem = JSON.parse(JSON.stringify(this.propertyItemObject.items));
    })
  }

}
