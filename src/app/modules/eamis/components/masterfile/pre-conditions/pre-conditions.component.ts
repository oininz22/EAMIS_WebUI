import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/internal/operators/first';
import { PreconditionsService } from 'src/app/services/Preconditions.service';
import { AppSettings } from 'src/shared/appsettings';
import { PreConditionsDTO } from 'src/shared/Models/Pre-conditionsDTO';
import Swal from 'sweetalert2';
import { PreconditionDialogComponent } from '../../mat-dialog/precondition-dialog/precondition-dialog.component';


@Component({
  selector: 'app-pre-conditions',
  templateUrl: './pre-conditions.component.html',
  styleUrls: ['./pre-conditions.component.css']
})
export class PreConditionsComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['description', 'actions'];
  pageEvent: PageEvent;

  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: PreconditionsService, private dialog: MatDialog) { 
  
  }

  openDialog(){
    this.dialog.open(PreconditionDialogComponent)
    .afterClosed().subscribe(response => {
      console.log(response);
      if(response === 'save'){
        this.getList();
        
      }
    });
  }
  getList() {
    this.MicroSvc.findAll('EamisPreconditions/list', 5, 1).pipe(first()).subscribe((response: PreConditionsDTO) => {
      this.dataSource = response;
    }) 
  }
  ngOnInit(){
    this.getList();
  }

  onPaginateChange(event: PageEvent ){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.findAll('EamisPreconditions/list', size, index).pipe(first()).subscribe((response: MatTableDataSource<PreConditionsDTO>) => {
      this.dataSource = response;
    });
  }
  editPreconditions(element: any){
    this.dialog.open(PreconditionDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  deletePreconditions(element: any){
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
        this.MicroSvc.deletePreconditions(element)
        .subscribe(response => {

          this.getList();  
          
        })
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
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
