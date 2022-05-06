import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, TemplateRef, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, from,Observable, of, throwError } from "rxjs";
import { UserDTO } from "src/shared/Models/UserDTO";
import { map, catchError, tap, first } from 'rxjs/operators';
import { EamisRolesDTO } from "src/shared/Models/EamisRolesDTO";
import { AppSettings } from "src/shared/appsettings";
import { LoginDTO } from "src/shared/Models/LoginDTO";
import * as CryptoJS from "crypto-js";
import { RolesDTO } from "src/shared/Models/RolesDTO";
import Swal from "sweetalert2";


@Injectable()
export class AuthenticationService {
    UserModel:LoginDTO;
    UserData = {};
    public currentUser: Observable<LoginDTO>;
    public currentUserSubject: BehaviorSubject<LoginDTO>;
    public AccountUser: LoginDTO;
    public isLoggeIn:boolean;
    public eas:CryptoJS;
    public roles:Array<string> = [];

   
    constructor(private router: Router,private http: HttpClient, private appsettings: AppSettings)
    {
      this.currentUserSubject = new BehaviorSubject<LoginDTO>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();

    }
    getToken(){
      return localStorage.getItem('token');
    }

 
    public get currentUserValue(): LoginDTO {
        return this.currentUserSubject.value ?? null;
    }
    isBlockedUser(user:UserDTO){
      const options = {

        body:{
         
         Password: user.password,
         Username: user.username
        },
        header: new HttpHeaders({
         'Content-Type' : 'application/json',
       }),
     };
     
     const body = JSON.stringify(user);
     console.log(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.put<any>(this.appsettings.baseURL + "EamisUserlogin/DirectBlockedUser",user)
    .pipe(tap(user =>{
      console.log(user);
    },(error:HttpErrorResponse)=>{
      console.log(error);
    }));
  }

    login(user:UserDTO)
    {
        const Login = {
            Username: user.username,
            Password: user.password,
        };
       
       
        const body = JSON.stringify(Login);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.post<LoginDTO>(this.appsettings.baseURL + "EamisUserlogin/login", user,{headers:headers})
        .pipe(tap(user=>{
          this.AccountUser = user;
          if(user.usersToken.isBlocked == true)
      {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This user is trying to connect more than 3 times.. Please contact your admin.',
          footer: '<a href="">Why do I have this issue?</a>',
          willOpen:()=>{
            window.localStorage.clear();
          },
          willClose: () => {
             window.location.reload();
          }
        });
      
       
      }
          localStorage.clear();
          let listofRoles = new RolesDTO();
          for(var i =0; i < this.AccountUser.usersToken.userRole.length; i++)
          {
            listofRoles = this.AccountUser.usersToken.userRole[i].roles;
            this.roles.push(listofRoles.role_Name);
        
          }
          window.localStorage.setItem("token",user.usersToken.accessToken);
          window.localStorage.setItem("refreshtoken",user.usersToken.refreshToken);
          window.localStorage.setItem("currentUser",JSON.stringify(user));
          window.localStorage.setItem("Roles",JSON.stringify(this.roles));
          this.currentUserSubject.next(user);
        }));
    }
    
    logout()
    {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: {
              id: this.currentUserValue.usersToken.id,
              user_Id: this.currentUserValue.usersToken.user_Id
            },
          };
          return  this.http.delete<UserDTO>(this.appsettings.baseURL+'EamisUserlogin/logout?Id='+this.currentUserValue.usersToken.id,options)
          .pipe(tap(response=>{
            
            this.stopRefreshTokenTimer();
            
          }));
        // localStorage.clear();
       
    }
    
    getUserRoles(roles:string[]){
      
    }
    
    getRefreshToken(){
      return localStorage.getItem("refreshtoken");
    }
    loggedIn():boolean{
      if(!!localStorage.getItem("currentUser")){
        return true;
      }
    }
    getNewrefreshToken(user:LoginDTO){
      const Login = {
        user_Id: user.usersToken.user_Id,
        refreshToken: user.usersToken.refreshToken,
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<LoginDTO>(this.appsettings.baseURL + "EamisUserlogin/refresh", user,{headers:headers})
    .pipe(tap((user:LoginDTO)=>{
      console.log(user);
      this.AccountUser = user;
      localStorage.clear();
      let listofRoles = new RolesDTO();
      for(var i =0; i < this.AccountUser.usersToken.userRole.length; i++)
      {
        listofRoles = this.AccountUser.usersToken.userRole[i].roles;
        this.roles.push(listofRoles.role_Name);
    
      }
      window.localStorage.setItem("token",user.usersToken.accessToken);
      window.localStorage.setItem("refreshtoken",user.usersToken.refreshToken);
      window.localStorage.setItem("currentUser",JSON.stringify(user));
      window.localStorage.setItem("Roles",JSON.stringify(user.usersToken.userRole));
      this.currentUserSubject.next(user);
      }));
  }
  private refreshTokenTimeout;
  startRefreshTokenTimer() {
    return this.refreshTokenTimeout = this.getNewrefreshToken(this.currentUserValue).subscribe();
} 
 stopRefreshTokenTimer() {
  clearTimeout(this.refreshTokenTimeout);

}
hasRoles(roles:any[]):boolean
{
for(const role of roles){
    if(!this.currentUserValue.usersToken.userRole || this.currentUserValue.usersToken.userRole.includes(role))
    
    return false;
    }

    return true;

  }

}