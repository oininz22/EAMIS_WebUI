import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatorGuard } from 'src/app/authenticator.guard';
import { AuthenticationService } from 'src/app/services/AuthenticationService.service';
import { LoginDTO } from 'src/shared/Models/LoginDTO';
import { RolesDTO } from 'src/shared/Models/RolesDTO';
import { MatMenuModule} from '@angular/material/menu';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationDialogComponent } from '../mat-dialog/user-registration-dialog/user-registration-dialog.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router,private http:HttpClient,
    private authenticationService:AuthenticationService,private authenticator:AuthenticatorGuard,
    private dialog: MatDialog) { }

  selectedMenu: any;
  UserInformation:any;
  Fullname:any;
  Nickname:any;
  expectedRoles:any;
  roles:string
  
  ngOnInit() {
    this.SideNavUserInfo();
    
  }
  

  goTo(paramText: string){
    this.selectedMenu = paramText;
    this.router.navigate([paramText]);
  }
  SideNavUserInfo(): LoginDTO{
    this.UserInformation = this.authenticationService.currentUserValue;


    this.Fullname =  this.UserInformation.usersToken.personnelInfo.firstName + " " +
    this.UserInformation.usersToken.personnelInfo.middleName + " " + 
    this.UserInformation.usersToken.personnelInfo.lastName;
    this.UserInformation.usersToken.personnelInfo.nickName;
    return this.UserInformation;
  }

  Logout(){

    // return this.authenticationService.logout().pipe(first()).subscribe();
    return this.authenticationService.logout().pipe(first()).subscribe(response=>{
      this.router.navigate(["/Login"]).then(()=>{
        window.localStorage.clear();
        window.location.reload();
      });
      //console.log(response);
      
    });
  }

  openDialog(){
    this.dialog.open(UserRegistrationDialogComponent);
  }

  

}
