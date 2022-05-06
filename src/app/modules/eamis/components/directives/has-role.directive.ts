import { ThrowStmt } from "@angular/compiler";
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/AuthenticationService.service";

@Directive({
    selector: "[appHasRole]",
  })
  export class HasRoleDirective implements OnInit {
    @Input("appHasRole") roles: Array<string>;
      ListofRoles:string[];
    constructor(private authSvc:AuthenticationService,private templateRef:TemplateRef<any>,private viewContainer:ViewContainerRef) {}
    ngOnInit() {
        const hideFor = this.roles || [];
        if(hideFor.length > 0){
          this.roleChecker(hideFor);
        }
        else{
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        this.ListofRoles = JSON.parse(localStorage.getItem("Roles"));
    
    }
  roleChecker(hideFor: Array<string>) {
    const userRoles:Array<string> = JSON.parse(localStorage.getItem("Roles"));
    if(userRoles.length === 0){
      this.viewContainer.clear();
    }
    else{
      const idx = userRoles.findIndex(role=>hideFor.indexOf(role) !== -1);
      return idx < 0 ? this.viewContainer.clear()  : this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
  }