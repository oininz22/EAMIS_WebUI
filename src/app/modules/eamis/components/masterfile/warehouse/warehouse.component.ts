import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs/operators';
import { WarehouseServiceService } from 'src/app/services/WarehouseService.service';
import { AppSettings } from 'src/shared/appsettings';
import { WarehouseDTO } from 'src/shared/Models/WarehouseDTO';
import Swal from 'sweetalert2';
import { WarehouseDialogComponent } from '../../mat-dialog/warehouse-dialog/warehouse-dialog.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  dataSource : any;
  displayedColumns: string[] = ['warehouseDescription','address', 'actions'];
  pageEvent: PageEvent;

  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: WarehouseServiceService, private dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.MicroSvc.findAll('EamisWarehouse/list', 5, 1).pipe(first()).subscribe((response: WarehouseDTO) => {
      this.dataSource = response;   
    }) 
  }

  openDialog(){
    this.dialog.open(WarehouseDialogComponent)
    .afterClosed().subscribe(response => {
      console.log(response);
      if(response === 'save'){
        this.getList();
        
      }
    });
  }

  editWarehouse(element: any){
    this.dialog.open(WarehouseDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  deleteWarehouse(element: any){
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
        this.MicroSvc.deleteWarehouse(element)
        .subscribe(response => {

          this.getList();  
          
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }else{
        this.getList();
      }
    })
    
  }
}
