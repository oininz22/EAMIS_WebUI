import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { RolesDTO } from 'src/shared/Models/RolesDTO';
import { AuthenticationService } from './services/AuthenticationService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorGuard implements CanActivate {
  constructor(private router:Router,private authSvc:AuthenticationService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     const isAuthorized = this.authSvc.currentUserValue.usersToken.userRole.includes(route.data.roles);
    

   return this.isAuthorized(route,state);
  }

 
  public isAuthorized(roles: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    //  const value =  JSON.parse(window.atob(localStorage.getItem('currentUser').split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    //  const matchesRoles = value;
    //  this.expectedRoles = matchesRoles;
    //  return matchesRoles < 0 ? false : true;
    // console.log(this.authSvc.roles);
    // const isAuthorized = this.authSvc.currentUserValue.usersToken.userRole.includes(roles.data.roles);
    // if(!isAuthorized){
    //   this.router.navigate(["/admin/dashboard"]);
    // }
    return this.authSvc.hasRoles(roles.data.roles);
    
     
   }
}