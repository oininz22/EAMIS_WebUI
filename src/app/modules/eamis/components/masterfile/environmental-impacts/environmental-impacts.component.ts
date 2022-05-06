import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs/operators';
import { ProcurementCategoryService } from 'src/app/services/ProcurementCategory.service';
import { AppSettings } from 'src/shared/appsettings';
import { EnvironmentalImpactsDTO } from 'src/shared/Models/EnvironmentalImpactsDTO';

@Component({
  selector: 'app-environmental-impacts',
  templateUrl: './environmental-impacts.component.html',
  styleUrls: ['./environmental-impacts.component.css']
})
export class EnvironmentalImpactsComponent implements OnInit {
impacts: any;
displayedColumns: string[] = ['no', 'description', 'action']
dataSource: any;
pageEvent: PageEvent;
url: string = 'EamisEnvironmentalImpacts/list';
size: number;
  index: number;
  constructor(private http: HttpClient, private appsettings: AppSettings, private MicroSvc: ProcurementCategoryService) { 
    // this.http.get(this.appsettings.baseURL + 'EamisEnvironmentalImpacts/list')
    // .subscribe((response: EnvironmentalImpactsDTO) => {
    //   this.impacts = response;
    //   console.log(this.impacts);
    // })
  }

  ngOnInit(){
    this.getList();
  }
  getList() {
    this.MicroSvc.findAll(this.url, 5, 1).pipe(first()).subscribe((response: EnvironmentalImpactsDTO) => {
      this.dataSource = response;
      console.log(this.dataSource);
    })
  }

  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize
    index = index + 1

    this.MicroSvc.findAll(this.url, size, index).pipe(first()).subscribe((response: EnvironmentalImpactsDTO) => {
      this.dataSource = response;
      console.log(this.dataSource);
    })
  }

}
