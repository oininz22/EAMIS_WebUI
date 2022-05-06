import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { FundsService } from 'src/app/services/funds.service';
import { FundsDTO } from 'src/shared/Models/FundsDTO';
import Swal from 'sweetalert2';
import { FundsDialogComponent } from '../../mat-dialog/funds-dialog/funds-dialog.component';

interface Filter {
  value : string;
}

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
displayedColumns: string[] = ['fund', 'code', 'financingSource', 'authorization', 'fundCategory', 'active', 'actions']
filter: Filter[] = [
                      {value: 'Fund'},
                      {value: 'Code'},
                      {value: 'Fund Category'},
                    ];
fundsObject: any;
funds: FundsDTO[] = [];
pageEvent: PageEvent;
searchControl = new FormControl();
dataSource: Observable<FundsDTO[]>
filterValue: any;
type: string;

  constructor(private fundSvc: FundsService, private dialog: MatDialog) { }

  ngOnInit(){
    this.getList();

    this.dataSource = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(fundCategory => (fundCategory ? this._filter(fundCategory) : this.funds.slice())),
    );
  }

  selectedType(trigger: MatSelectChange){
    this.type = trigger.value;
    console.log(this.type);
  }

  valueChange(){
    console.log('this is search input', this.searchControl.value);
    if(this.searchControl.value === ''){
      this.getList();
    }
  }

  displayFn(user: FundsDTO) : string {
    return user && user.fundCategory ? user.fundCategory : '';
  }

  public _filter(fundCategory: string): FundsDTO[] {
    this.filterValue = fundCategory.toLowerCase();
      if(this.searchControl.value == ''){
       this.getList();
     }else{
       this.getFilter();
     }
  
   return this.funds.filter(option => option.fundCategory.toLowerCase().includes(this.filterValue));
 }

 getFilter(){
  this.fundSvc.searchFunds(this.type, this.filterValue).subscribe((response: FundsDTO) => {
      this.fundsObject = response;
      this.funds = JSON.parse(JSON.stringify(this.fundsObject.items));
  });
}

  openDialog(){
    this.dialog.open(FundsDialogComponent)
    .afterClosed().subscribe(response => {
      response;
      if (response === 'save'){
        this.getList();
      }
    })
  }

  editFunds(element: any){
    this.dialog.open(FundsDialogComponent, {
      data: element,
      id: element.id
    }).afterClosed().subscribe(response => {
      if(response === 'update'){
        this.getList();
      }
    })
  }

  deleteFunds(element: any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      width: 400
    }).then((result) => {
      if(result.isConfirmed){
        this.fundSvc.deleteFundSource(element)
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
    this.fundSvc.getAllFunds(5, 1).subscribe((response: FundsDTO) => {
      this.fundsObject = response;
      this.funds = JSON.parse(JSON.stringify(this.fundsObject.items));
    })
  }

  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.fundSvc.getAllFunds(size, index).subscribe((response: FundsDTO) => {
      this.fundsObject = response;
      this.funds = JSON.parse(JSON.stringify(this.fundsObject.items));
    })
  }

}
