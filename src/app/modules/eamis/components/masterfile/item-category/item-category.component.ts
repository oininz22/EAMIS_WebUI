import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { ItemCategoryService } from 'src/app/services/ItemCategory.service';
import { ItemCategoryDTO } from 'src/shared/Models/ItemCategoryDTO';
import Swal from 'sweetalert2';
import { ItemCategoryDialogComponent } from '../../mat-dialog/item-category-dialog/item-category-dialog.component';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})



export class ItemCategoryComponent implements OnInit {
displayedColumns: string[] = ['shortDescription', 'categoryName', 'accountCode', 'costMethod', 'depreciationMethod', 
'estimatedLife', 'isSerialized', 'isStockable', 'isSupplies', 'isAsset', 'isActive', 'actions']
object: any;
pageEvent: PageEvent;
itemCategory: ItemCategoryDTO[] = [];
dataSource: Observable<ItemCategoryDTO[]>
searchControl = new FormControl();
filterValue: any;
  constructor(private microSvc: ItemCategoryService, private dialog: MatDialog) { }

  ngOnInit(){
    this.getList();

    this.dataSource = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.categoryName)),
      map(categoryName => (categoryName ? this._filter(categoryName) : this.itemCategory.slice())),
    );
    
  }

  openDialog(){
    this.dialog.open(ItemCategoryDialogComponent)
    .afterClosed().subscribe(response => {
      response;
      if(response === 'save'){
        this.getList();
        
      }
    });
  }

  editItemCategory(element: any){
    this.dialog.open(ItemCategoryDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  valueChange(){
    console.log('this is search input', this.searchControl.value);
    if(this.searchControl.value === ''){
      this.getList();
    }
  }

  displayFn(user: ItemCategoryDTO) : string {
    return user && user.categoryName ? user.categoryName : '';
  }

  public _filter(categoryName: string): ItemCategoryDTO[] {
    this.filterValue = categoryName.toLowerCase();
      if(this.searchControl.value == ''){
       this.getList();
     }else{
       this.getFilter();
     }
  
   return this.itemCategory.filter(option => option.categoryName.toLowerCase().includes(this.filterValue));
 }

 getFilter(){
  this.microSvc.searchItemCategory(this.filterValue).subscribe((response: ItemCategoryDTO) => {
      this.object = response;
      this.itemCategory = JSON.parse(JSON.stringify(this.object.items));
  });
}

  getList(){
    this.microSvc.getItemCategoryList(5, 1).subscribe((response: ItemCategoryDTO) => {
      this.object = response;
      this.itemCategory = JSON.parse(JSON.stringify(this.object.items))
      console.log(this.itemCategory);
    })
  }


  // getList(){
  //   this.microSvc.getItemCategoryList(5, 1).subscribe((response: ItemCategoryDTO) => {
  //     this.object = response;
  //     this.itemCategory = JSON.parse(JSON.stringify(this.object.items))
  //     console.log(this.itemCategory);
  //   })
  // }

  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.microSvc.getItemCategoryList(size, index).pipe(first()).subscribe((response: ItemCategoryDTO) => {
      this.object = response;
      this.itemCategory = JSON.parse(JSON.stringify(this.object.items));
    })
  }

  deleteItemCategory(id: number, element: any){
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
        this.microSvc.deleteItemCategory(id, element)
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
