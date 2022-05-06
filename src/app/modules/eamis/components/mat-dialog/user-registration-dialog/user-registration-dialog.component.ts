import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from 'src/app/services/UserRegistration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-registration-dialog',
  templateUrl: './user-registration-dialog.component.html',
  styleUrls: ['./user-registration-dialog.component.css']
})
export class UserRegistrationDialogComponent implements OnInit {
userRegistrationForm: FormGroup;
hide = true;

  constructor(private formBuilder: FormBuilder, private MicroSvc: UserRegistrationService,
    private dialogRef: MatDialogRef<UserRegistrationDialogComponent>) { }

  ngOnInit(){
    this.userRegistrationForm = this.formBuilder.group({
      id: [0],
      username: ['', Validators.required],
      password: ['', Validators.required],
      agencyEmployeeNumber: ['', Validators.required],
    })
  }

  addUser(){
    if (this.userRegistrationForm.valid){
      this.MicroSvc.postUser(this.userRegistrationForm.value)
        .subscribe({
          next:(res)=> {
            Swal.fire({
              title: 'Created Successfully !',
              icon: 'success',
              heightAuto: false,
              width: 400
            })
            this.dialogRef.close()
          },
          error:(err: ErrorHandler)=>{
            console.log(err);
            alert("Error while creating a user")
          }
        })
    }
  }

  getUsernameErrorMsg(){
    if (this.userRegistrationForm.controls.username.hasError('required')){
      return 'Username is required';
    }
  }

  getPasswordErrorMsg(){
    if (this.userRegistrationForm.controls.password.hasError('required')){
      return 'Password is required';
    }
  }

  getAgencyEmployeeNoErrorMsg(){
    if (this.userRegistrationForm.controls.agencyEmployeeNumber.hasError('required')){
      return 'Agency Employee Number is required';
    }
  }

  clearUser(){
    this.userRegistrationForm.reset();
  }

}
