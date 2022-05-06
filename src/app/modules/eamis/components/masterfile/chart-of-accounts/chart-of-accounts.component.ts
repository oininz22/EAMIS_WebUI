import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/internal/operators/first';
import { ChartofAccountServiceService } from 'src/app/services/ChartOfAccountService.service';
import { AppSettings } from 'src/shared/appsettings';
import { ChartofAccountsDTO } from 'src/shared/Models/ChartofAccountsDTO';
import { ClassificationDTO } from 'src/shared/Models/ClassificationDTO';
import Swal from 'sweetalert2';
import { ChartOfAccountsDialogComponent } from '../../mat-dialog/chart-of-accounts-dialog/chart-of-accounts-dialog.component';

@Component({
  selector: 'app-chart-of-accounts',
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.css']
})
export class ChartOfAccountsComponent implements OnInit {
  dataSource: ChartofAccountsDTO[] = [];
  dataClassification : ClassificationDTO[] = [];
  displayedColumns: string[] = ['account_Code', 'object_Code','classification','subClassification','group','is_Active','is_InventoryItem', 'actions'];
  pageEvent: PageEvent;
  objectChart: any;


  constructor(private http: HttpClient, private appsettings: AppSettings, 
    private MicroSvc: ChartofAccountServiceService, private dialog: MatDialog) { 
  
  }

  ngOnInit(){
    this.getList();
  }

  getList() {
    this.MicroSvc.findAll('EamisChartofAccounts/list', 5, 1).pipe(first()).subscribe((response: ChartofAccountsDTO) => {
      this.objectChart = response;
      this.dataSource = JSON.parse(JSON.stringify(this.objectChart.items));
      
      
    }) 
  }

  onPaginateChange(event: PageEvent ){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.findAll('EamisChartofAccounts/list', size, index).pipe(first()).subscribe((response: MatTableDataSource<ChartofAccountsDTO>) => {
      this.objectChart = response;
      this.dataSource = JSON.parse(JSON.stringify(this.objectChart.items));
     
    });
  }

  openDialog(){
    this.dialog.open(ChartOfAccountsDialogComponent)
    .afterClosed().subscribe(response => {
      console.log(response);
      if(response === 'save'){
        this.getList();
        
      }
    });
  }

  editChartofAccounts(element: any){
    this.dialog.open(ChartOfAccountsDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getList();
      }
    })
  }

  

  deleteChartofAccounts(element: any){
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
        this.MicroSvc.deleteChartofAccounts(element)
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
