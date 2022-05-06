import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { RequiredAttachmentService } from 'src/app/services/RequiredAttachment.service';
import { AppSettings } from 'src/shared/appsettings';
import { AttachmentDTO } from 'src/shared/Models/RequiredAttachmentDTO';
import Swal from 'sweetalert2';
import { RequiredattachmentDialogComponent } from '../../mat-dialog/requiredattachment-dialog/requiredattachment-dialog.component';

@Component({
  selector: 'app-required-attachment',
  templateUrl: './required-attachment.component.html',
  styleUrls: ['./required-attachment.component.css']
})
export class RequiredAttachmentComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['Type','isRequired', 'actions'];
  pageEvent: PageEvent;

  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: RequiredAttachmentService, private dialog: MatDialog) { 
  
  }

  ngOnInit(): void {
    this.getList();
  }

  onPaginateChange(event: PageEvent ){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.findAll('EamisAttachments/list', size, index).pipe(first()).subscribe((response: MatTableDataSource<AttachmentDTO>) => {
      this.dataSource = response;
      console.log(this.dataSource);
    });
  }
  openDialog(){
    this.dialog.open(RequiredattachmentDialogComponent)
    .afterClosed().subscribe(response => {
      console.log(response);
      if(response === 'save'){
        this.getList();
        
      }
    });
  }
  getList() {
    this.MicroSvc.findAll('EamisAttachments/list', 5, 1).pipe(first()).subscribe((response: AttachmentDTO) => {
      this.dataSource = response;
      console.log(this.dataSource);
      
    }) 
  }

  editRequiredAttachment(element: any){
    this.dialog.open(RequiredattachmentDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  deleteRequiredAttachment(element: any){
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
        this.MicroSvc.deleteRequiredAttachment(element)
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
