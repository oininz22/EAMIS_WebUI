import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/AuthenticationService.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
dataSource: any;
  constructor( private authenticationService:AuthenticationService ) { }

  ngOnInit() {
  this.dataSource = this.authenticationService.currentUserValue.usersToken.personnelInfo;
  }

}
