import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { EnvironmentalAspectsService } from 'src/app/services/EnvironmentalAspects.service';
import { ProcurementCategoryService } from 'src/app/services/ProcurementCategory.service';
import { AppSettings } from 'src/shared/appsettings';
import { EnvironmentalAspectsDTO } from 'src/shared/Models/EnvironmentalAspectsDTO';

@Component({
  selector: 'app-environmental-aspects',
  templateUrl: './environmental-aspects.component.html',
  styleUrls: ['./environmental-aspects.component.css']
})
export class EnvironmentalAspectsComponent implements OnInit {
aspects:  any;
displayedColumns: string[] = ['no', 'description', 'action'];
dataSource: any;
pageEvent: PageEvent;
url: string = 'EamisEnvironmentalAspects/list';
size: number;
index: number;
@ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private http: HttpClient, private appsettings: AppSettings, private MicroSvc: EnvironmentalAspectsService) { 

    
  }
    
  ngOnInit(): void {
    // this.http.get(this.appsettings.baseURL + 'EamisEnvironmentalAspects/list')
    // .subscribe((response: EnvironmentalAspectsDTO) => {
    //   this.aspects = response;
    //   const element = this.aspects;
      
    // });
    // this.dataSource = this.aspects;
    // this.dataSource.paginator = this.paginator;
    // console.log(this.dataSource);

   this.getList();
  }
  getList() {
    this.MicroSvc.getAspectsList(5, 1).pipe(first()).subscribe((response: EnvironmentalAspectsDTO) => {
      this.dataSource = response;
      console.log(this.dataSource);
    })
  }

  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.MicroSvc.getAspectsList(size, index).pipe(first()).subscribe((response: EnvironmentalAspectsDTO) => {
      this.dataSource = response;
      console.log(this.dataSource);
    })
  }
  
  
}

