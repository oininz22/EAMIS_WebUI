import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { ItemSubCategoryService } from 'src/app/services/ItemSubCategory.service';
import { ItemSubCategoryDTO } from 'src/shared/Models/ItemSubCategoryDTO';
import Swal from 'sweetalert2';
import { ItemSubCategoryDialogComponent } from '../../mat-dialog/item-sub-category-dialog/item-sub-category-dialog.component';

interface Filter{
  value: string;
}

@Component({
  selector: 'app-item-sub-category',
  templateUrl: './item-sub-category.component.html',
  styleUrls: ['./item-sub-category.component.css']
})
export class ItemSubCategoryComponent implements OnInit {
displayedColumns: string[] = ['categoryName', 'subCategoryName', 'isActive', 'actions'];
itemSubCategory: ItemSubCategoryDTO[] = [];
searchControl = new FormControl();
object: any;
dataSource: Observable<ItemSubCategoryDTO[]>;
pageEvent: PageEvent;
filterValue: any;
filter: Filter[] = [{value: 'Category Name'}, {value: 'Sub Category Name'}];
type: string;

  constructor(private microSvc: ItemSubCategoryService, private dialog: MatDialog) { }

  ngOnInit(){
    this.getList();
    
    this.dataSource = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.subCategoryName)),
      map(subCategoryName => (subCategoryName ? this._filter(subCategoryName) : this.itemSubCategory.slice())),
    );
  }

  selectedType(trigger: MatSelectChange){
    this.type = trigger.value;
    console.log(this.type);
  }

  getFilter(){
    this.microSvc.searchItemSubCategory(this.type, this.filterValue).subscribe((response: ItemSubCategoryDTO) => {
      this.object = response;
        this.itemSubCategory = JSON.parse(JSON.stringify(this.object.items));
    });
  }

  public _filter(subCategoryName: string): ItemSubCategoryDTO[] {
    this.filterValue = subCategoryName.toLowerCase();
      if(this.searchControl.value == ''){
       this.getList();
     }else{
       this.getFilter();
     }
  
   return this.itemSubCategory.filter(option => option.subCategoryName.toLowerCase().includes(this.filterValue));
 }

  getList(){
    this.microSvc.getItemSubCategoryList(5, 1).subscribe((response: ItemSubCategoryDTO) => {
      this.object = response;
      this.itemSubCategory = JSON.parse(JSON.stringify(this.object.items))
    })
  }

  displayFn(user: ItemSubCategoryDTO) : string {
    return user && user.subCategoryName ? user.subCategoryName : '';
  }

  valueChange(){
    if(this.searchControl.value === ''){
      this.getList();
    }
  }

  openDialog(){
    this.dialog.open(ItemSubCategoryDialogComponent)
    .afterClosed().subscribe(response => {
      response;
      if(response === 'save'){
        this.getList();
        
      }
    });

  }

  editItemSubCategory(element: any){
    this.dialog.open(ItemSubCategoryDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  deleteItemSubCategory(id: number, element: any){
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
        this.microSvc.deleteItemSubCategory(id, element)
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


  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.microSvc.getItemSubCategoryList(size, index).pipe(first()).subscribe((response: ItemSubCategoryDTO) => {
      this.object = response;
      this.itemSubCategory = JSON.parse(JSON.stringify(this.object.items));
    })
  }


}
