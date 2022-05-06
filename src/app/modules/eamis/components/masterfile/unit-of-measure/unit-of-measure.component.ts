import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { UnitofMeasureService } from 'src/app/services/UnitofMeasure.service';
import { AppSettings } from 'src/shared/appsettings';
import { UnitofMeasureDTO } from 'src/shared/Models/UnitofMeasureDTO';
import Swal from 'sweetalert2';
import { UnitmeasureDialogComponent } from '../../mat-dialog/unitmeasure-dialog/unitmeasure-dialog.component';

@Component({
  selector: 'app-unit-of-measure',
  templateUrl: './unit-of-measure.component.html',
  styleUrls: ['./unit-of-measure.component.css']
})
export class UnitOfMeasureComponent implements OnInit {
  dataSource : any;
  displayedColumns: string[] = ['uomshortDesc','uomDescription', 'actions'];
  pageEvent: PageEvent;

  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: UnitofMeasureService, private dialog: MatDialog) { 
  
  }
  onPaginateChange(event: PageEvent ){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.findAll('EamisUnitofMeasure/list', size, index).pipe(first()).subscribe((response: MatTableDataSource<UnitofMeasureDTO>) => {
      this.dataSource = response;
      console.log(this.dataSource);
    });
  }

  ngOnInit(){
    this.getList();
  }

  getList() {
    this.MicroSvc.findAll('EamisUnitofMeasure/list', 5, 1).pipe(first()).subscribe((response: UnitofMeasureDTO) => {
      this.dataSource = response; 
    }) 
  }

  openDialog(){
    this.dialog.open(UnitmeasureDialogComponent)
    .afterClosed().subscribe(response => {
      console.log(response);
      if(response === 'save'){
        this.getList();
        
      }
    });
  }

  editUnitMeasure(element: any){
    this.dialog.open(UnitmeasureDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  deleteUnitMeasure(element: any){
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
        this.MicroSvc.deleteUnitMeasure(element)
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
