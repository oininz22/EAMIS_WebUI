import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs/operators';
import { UserListService } from 'src/app/services/UserList.service';
import { ItemSubCategoryDTO } from 'src/shared/Models/ItemSubCategoryDTO';
import { UserDTO } from 'src/shared/Models/UserDTO';
import { UserRegistrationDialogComponent } from '../mat-dialog/user-registration-dialog/user-registration-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'firstName', 'middleName', 'lastName'];
  dataSource: any;
  userList: UserDTO[];
  objectUser: any;
  pageEvent: PageEvent;
  constructor(private microSvc: UserListService, private dialog: MatDialog) { }

  ngOnInit(){
    this.getUserList();
  }

  openUserDialog(){
    this.dialog.open(UserRegistrationDialogComponent);
  }

  getUserList(){
    this.microSvc.getUser(5, 1).subscribe((response: UserDTO) => {
      this.objectUser = response;
      this.userList = JSON.parse(JSON.stringify(this.objectUser.items));
      console.log(this.userList);
    })
  }

  onPaginateChange(event: PageEvent){
    let index = event.pageIndex;
    let size = event.pageSize;
    index = index + 1;

    this.microSvc.getUser(size, index).pipe(first()).subscribe((response: UserDTO) => {
      this.objectUser = response;
      this.userList = JSON.parse(JSON.stringify(this.objectUser.items));
    })
  }

}
