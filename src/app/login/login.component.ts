import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmptyError, Observable } from 'rxjs';
import { map,first } from 'rxjs/operators';
import { AppSettings } from 'src/shared/appsettings';
import { ErrorHandler } from 'src/shared/ErrorHandler';
import { EamisRolesDTO } from 'src/shared/Models/EamisRolesDTO';
import { LoginDTO } from 'src/shared/Models/LoginDTO';
import { UserDTO } from 'src/shared/Models/UserDTO';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/AuthenticationService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  _appsettings: AppSettings;
  Users: EamisRolesDTO[];
  UserModel: UserDTO;
  LoginForm:  FormGroup;
  tryCount:number = 0;
  maxCount:number =3;
  
 
  constructor(private http: HttpClient, private appsettings: AppSettings,private authenticationService: AuthenticationService,private fb: FormBuilder,private router:Router)
  {
    this._appsettings = appsettings;

    
  }
  ngOnInit() {
    this.getUsers();
    if(!!this.authenticationService.loggedIn()){
      this.router.navigate(["/admin/dashboard"]);
    }
   else{
     if(this.authenticationService.loggedIn()){
      this.router.navigate(["/Login"]);
     }
   }

  this.LoginForm = new FormGroup({
  
    username: new FormControl(''),
    password: new FormControl(''),

  });
  
}

  get username(){return this.LoginForm.get('username')}

  get password(){return this.LoginForm.get('password')}

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  getUsernameErrorMessage() {
    if (this.usernameFormControl.hasError('required')) {
      return 'Username is required';
      }
  }

  getPasswordErrorMessage(){
    if (this.passwordFormControl.hasError('required')){
      return 'Password is required';
        }
  }
  
 
  getUsers()
  {
    this.http.get(this.appsettings.baseURL  + 'EamisRoles/list').subscribe(response => 
    { 
      console.log(response);
   
   },error =>{
 console.log(error)
   });
  }
  OnSubmit():Observable<LoginDTO>
{
  if (this.LoginForm.invalid) return;
  if(this.maxCount == this.tryCount){
    let timerInterval
    this.authenticationService.isBlockedUser(this.LoginForm.value).subscribe(res => {
      console.log(res);
    });
    Swal.fire({
    
      icon: 'error',
      title: 'Oops...',
      text: `Your Account was reached the maximum try for login this user... Refresh the page.`,
      footer: '<a href="">Why do I have this issue?</a>',
      didOpen: () => {
        Swal.showLoading();
       // const b = Swal.getHtmlContainer().querySelector('strong').textContent = Swal.getTimerLeft().toString();
      },
      willClose: () => {
        this.tryCount = 0;
      }

    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    return;
  }
    this.authenticationService.login(this.LoginForm.value).pipe(first()).subscribe(response => {
      
     
      this.router.navigate(['/admin']);
      console.log(response);
    }, (error:HttpErrorResponse) => {
      console.log(error.message);
     if(error.message == "no elements in sequence")
     {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username or Password is incorrect.!',
        footer: '<a href="">Why do I have this issue?</a>'
        
      });
     }
     else{
       this.tryCount = this.tryCount +1
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Username or Password is incorrect.. ${this.tryCount} of ${this.maxCount}.`,
        footer: '<a href="">Why do I have this issue?</a>'
     }
    )};
})
}



logout(){
  this.authenticationService.logout().subscribe();
}
// getCurrentUser(){
//   this.authenticationService.currentUser$.subscribe(user=>{
//     this.loggedIn = !!user;
//   },error=> {
//     console.log(error);
//   })
// }
// setCurrentUser(){
//   const user: UserDTO = JSON.parse(localStorage.getItem("user"));
//   this.authenticationService.setCurrentUser(user);
// }
}
