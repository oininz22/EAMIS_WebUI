import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/internal/operators/first';
import { RoleManagerService } from 'src/app/services/RoleManager.service';
import { AppSettings } from 'src/shared/appsettings';
import { RoleManagerDTO } from 'src/shared/Models/RoleManagerDTO';
import Swal from 'sweetalert2';
import { RolemanagerDialogComponent } from '../mat-dialog/rolemanager-dialog/rolemanager-dialog.component';


@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {
  dataSourceRole: any;
  displayedColumns: string[] = ['no','role_Name', 'isDeleted', 'actions'];
  pageEvent: PageEvent;

  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: RoleManagerService, private dialog: MatDialog) { 
  
  }

  ngOnInit(){
    this.getListRoles();
  }
  openDialog(){
    this.dialog.open(RolemanagerDialogComponent)
    .afterClosed().subscribe(response => {
      console.log(response);
      if(response === 'save'){
        this.getListRoles();
      }
    });
  }

  onPaginateChangeRole(event: PageEvent ){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.findAll('EamisRoles/list', size, index).pipe(first()).subscribe((response: MatTableDataSource<RoleManagerDTO>) => {
      this.dataSourceRole = response;
      //console.log(this.dataSourceRole);
    });
  }
  getListRoles() {
    this.MicroSvc.findAll('EamisRoles/list', 5, 1).pipe(first()).subscribe((response: RoleManagerDTO) => {
      this.dataSourceRole = response;
      //console.log(this.dataSourceRole);
    }) 
  }
  getListUsers(){
    
  }

  editRoleManager(element: any){
    this.dialog.open(RolemanagerDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getListRoles();
      }
    })
  }

  deleteRoleManager(element: any){
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
        this.MicroSvc.deleteRoleManager(element)
        .subscribe(response => {

          this.getListRoles();  
          
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }else{
        this.getListRoles();
      }
    })
    
  }

}
