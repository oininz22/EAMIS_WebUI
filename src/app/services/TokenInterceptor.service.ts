import { Injectable,Injector } from '@angular/core';
import { HttpClient,HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { AuthenticationService } from './AuthenticationService.service';
import { AppSettings } from 'src/shared/appsettings';
import { catchError, tap,first, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    private isRefreshing = false;
    constructor(private authSrvc:AuthenticationService,private appsettings:AppSettings)
    {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.addBearerToken(req, next));
      }
    
      private async addBearerToken(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        var token =  this.authSrvc.getToken();
        //const reftoken = await JSON.stringify(this.authSrvc.getRefreshToken());
        const headerSettings = req.headers.keys().reduce(
          (acc, cur) => {
            acc[cur] = req.headers.getAll(cur);
            return acc;
          }, {});
    
        if (token) {
          headerSettings["Authorization"] = `Bearer ${ token }`;
         
        } else {
          console.log("performing request without auth!");
        }
        // prevent 302 redirect to challenge on a 401
        headerSettings["X-Requested-With"] = "XMLHttpRequest";
        const
          headers = new HttpHeaders(headerSettings),
          newRequest = req.clone({ headers });
        const result = next.handle(newRequest).toPromise();
        return result.catch(async (err:HttpErrorResponse) => {
          if (err.status === 401) {
           // const newRefreshedToken = await this.authSrvc.startRefreshTokenTimer();
             await this.authSrvc.startRefreshTokenTimer();
            token = this.authSrvc.getToken();
            headerSettings["Authorization"] = `Bearer ${ token }`;
            const
              updatedHeaders = new HttpHeaders(headerSettings),
              updatedRequest = req.clone({ headers: updatedHeaders });
            console.log("requery with new token"); // <-- When I have a 401, eg by altering the auth token to be bad, whilst leaving the refresh token alone
            return next.handle(updatedRequest).toPromise().then(data => {
              console.log("requeried data:", data); // <-- With the valid data coming back from the second request
              return data; // <-- however the original caller doesn't get this data
            });
          }
        });
        return result;
    
      }
      
      
      

}


