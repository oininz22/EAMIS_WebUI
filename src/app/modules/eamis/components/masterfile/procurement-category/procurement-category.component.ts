import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, startWith} from 'rxjs/operators';
import { ProcurementCategoryService } from 'src/app/services/ProcurementCategory.service';
import { AppSettings } from 'src/shared/appsettings';
import { ProcurementCategoryDTO } from 'src/shared/Models/ProcurementCategoryDTO';
import Swal from 'sweetalert2';
import { ProcurementCategoryDialogComponent } from '../../mat-dialog/procurement-category-dialog/procurement-category-dialog.component';




export interface DialogData{
  animal: string;
  name: string;
}
@Component({
  selector: 'app-procurement-category',
  templateUrl: './procurement-category.component.html',
  styleUrls: ['./procurement-category.component.css']
})

export class ProcurementCategoryComponent implements OnInit {
  procurement: ProcurementCategoryDTO[] = [];
  displayedColumns: string[] = ['description', 'isActive', 'actions'];
  pageEvent: PageEvent;
  searchControl = new FormControl();
  dataSource: any;
  item:any;
  object: any;
  url: string = 'EamisProcurementCategory/list';
  size: number;
  index: number;
  add: any;
  alertMsg = 'Added procurement category sucessfully !';
  filterValue: any;



  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: ProcurementCategoryService, private dialog: MatDialog, private router: Router) { 
  
  }
  
  ngOnInit(){
    
    this.getList();

    this.dataSource = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.procurementDescription)),
      map(procurementDescription => (procurementDescription ? this._filter(procurementDescription) : this.procurement.slice())),
    );
   
  }


  valueChange(){
    console.log('this is search input', this.searchControl.value);
    if(this.searchControl.value === ''){
      this.getList();
    }
  }

  

  displayFn(user: ProcurementCategoryDTO) : string {
    return user && user.procurementDescription ? user.procurementDescription : '';
  }

  public _filter(procurementDescription: string): ProcurementCategoryDTO[] {
    this.filterValue = procurementDescription.toLowerCase();
      if(this.searchControl.value == ''){
       this.getList();
     }else{
       this.getFilter();
     }
  
   return this.procurement.filter(option => option.procurementDescription.toLowerCase().includes(this.filterValue));
 }


 getFilter(){
  this.MicroSvc.searchProcurementCategory('Procurement Description', this.filterValue).subscribe((response: ProcurementCategoryDTO) => {
    this.object = response;
    this.procurement = JSON.parse(JSON.stringify(this.object.items));
    
  });
}

  openDialog(){
    this.dialog.open(ProcurementCategoryDialogComponent)
    .afterClosed().subscribe(response => {
      this.add = response;
      if(response === 'save'){
        this.getList();
        
      }
    });
  
  }

  editCategory(element: any){
    this.dialog.open(ProcurementCategoryDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  deleteCategory(id: number, element: any){
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
        this.MicroSvc.deleteCategory(id, element)
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
  
  
  getList() {
    this.MicroSvc.findAll(this.url, 5, 1).pipe(first()).subscribe((response: ProcurementCategoryDTO) => {
      this.object = response;
      this.procurement = JSON.parse(JSON.stringify(this.object.items));
    }) 
  }


  onPaginateChange(event: PageEvent ){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.findAll(this.url, size, index).pipe(first()).subscribe((response: ProcurementCategoryDTO) => {
      this.object = response;
      this.procurement = JSON.parse(JSON.stringify(this.object.items));
    });
  }

}
