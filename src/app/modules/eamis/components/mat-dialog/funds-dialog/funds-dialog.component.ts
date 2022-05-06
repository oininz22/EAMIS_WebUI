import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FundsService } from 'src/app/services/funds.service';
import { AuthorizationDTO } from 'src/shared/Models/AuthorizationDTO';
import { FinancingSourceDTO } from 'src/shared/Models/FinancingSourceDTO';
import { FundsDTO } from 'src/shared/Models/FundsDTO';
import { GeneralFundSourceDTO } from 'src/shared/Models/GeneralFundSourceDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funds-dialog',
  templateUrl: './funds-dialog.component.html',
  styleUrls: ['./funds-dialog.component.css']
})
export class FundsDialogComponent implements OnInit {
fundsForm: FormGroup;
financingSourceObject: any;
financingSource: FinancingSourceDTO[];
authorizationObject: any;
authorization: AuthorizationDTO[];
genFundsObject: any;
genFunds: GeneralFundSourceDTO[];
actionBtn: string = "Save";
error: string;

  constructor(private fundSvc: FundsService, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA)
   public editData: any, private dialogRef: MatDialogRef<FundsDialogComponent>) { }

  ngOnInit(){
    this.getGenFund();
    this.getFinancing();
    this.getAuth();

    this.fundsForm = this.formBuilder.group({
      id: [0],
      genFundId: ['', Validators.required],
      code: ['', Validators.required],
      financingSourceId: ['', Validators.required],
      authorizationId: ['', Validators.required],
      fundCategory: ['', Validators.required],
      isActive: [false, Boolean]
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.fundsForm.controls['id'].setValue(this.editData.id);
      this.fundsForm.controls['genFundId'].setValue(this.editData.genFundId);
      this.fundsForm.controls['code'].setValue(this.editData.code);
      this.fundsForm.controls['financingSourceId'].setValue(this.editData.financingSourceId);
      this.fundsForm.controls['authorizationId'].setValue(this.editData.authorizationId);
      this.fundsForm.controls['fundCategory'].setValue(this.editData.fundCategory);
      this.fundsForm.controls['isActive'].setValue(this.editData.isActive);
      console.log('this is edit', this.editData);
    } 
  }

  authorizationFormControl = new FormControl('', [Validators.required]);
  fundCategoryFormControl = new FormControl('', [Validators.required]);

  getFundErrorMessage(){
    if(this.fundsForm.controls['genFundId'].hasError('required')){
      return 'Fund is required';
    }
  }

  getCodeErrorMessage(){
    if (this.fundsForm.controls['code'].hasError('required')){
      return 'code is required';
    }
  }

  getFinancialErrorMessage(){
    if (this.fundsForm.controls['financingSourceId'].hasError('required')){
      return 'Financial Source is required';
    }
  }

  getAuthorizationErrorMsg(){
    if(this.fundsForm.controls['authorizationId'].hasError('required')){
      return 'Authorization is required'
    }
  }

  getFundCategoryErrorMsg(){
    if(this.fundsForm.controls['fundCategory'].hasError('required')){
      return 'Fund Category is required'
    }
  }

  // getErrorMessage(){
  //   if (this.authorizationFormControl.hasError('required')){
  //     return 'Authorization is required'
  //   }
  //   else if(this.fundCategoryFormControl.hasError('required')){
  //     return 'Fund Category is required';
  //   }
  // }

  checkActive(trigger: MatCheckboxChange){
    return this.fundSvc.checkIsActive(trigger);
  }


  getAuth() {
    this.fundSvc.getAuthorization().subscribe((response: AuthorizationDTO) => {
      this.authorizationObject = response;
      this.authorization = JSON.parse(JSON.stringify(this.authorizationObject.items));
      console.log(this.authorization);
    })
  }

  getFinancing() {
    this.fundSvc.getFinancingSource().subscribe((response: FinancingSourceDTO) => {
      this.financingSourceObject = response;
      this.financingSource = JSON.parse(JSON.stringify(this.financingSourceObject.items));
      console.log('Financing', this.financingSource);
    })
  }

  getGenFund() {
    this.fundSvc.getGeneralFund().subscribe((response: GeneralFundSourceDTO) => {
      this.genFundsObject = response;
      this.genFunds = JSON.parse(JSON.stringify(this.genFundsObject.items));
    })
  }

  submitFunds(){
    if(!this.editData){
      if(this.fundsForm.valid){
        //this.fundsForm.value.isActive = this.fundSvc.isActive;
        this.fundSvc.postFundSource(this.fundsForm.value)
          .subscribe({
            next:(res) => {
              Swal.fire({
                title: 'Added Successfully !',
                icon: 'success',
                heightAuto: false,
                width: 400
              })
              this.dialogRef.close('save');
            },
            error:()=>{
              Swal.fire({
                icon: 'error',
                title: 'Fund Code is already exist!',
                heightAuto: false,
                width: 400
              })
              //console.log(error);
                //alert("Error while adding the funds");
             
               //alert("Error while adding the funds");
              //console.log(Error);
            }
          })
      }
    }else{
      this.editFunds();
    }

  }

  // submitFunds(){
  //   if(!this.editData){
  //     if(this.fundsForm.valid){
  //       this.fundSvc.postFundSource(this.fundsForm.value)
  //       .subscribe((data) => {
  //         console.log(data)
  //       }, (error) => {
  //         console.log(error)
  //       });
  //     }
  
  //   }  
  // }

  

  editFunds() {
    if(this.fundsForm.valid){
      this.fundSvc.editFundSource(this.fundsForm.value)
        .subscribe({
          next:(res)=>{
            Swal.fire({
              title: 'Update Successfully !',
              icon: 'success',
              heightAuto: false,
              width: 400
            })
            this.dialogRef.close('update');
          },
          error:()=>{
            Swal.fire({
              icon: 'error',
              title: 'Fund Code is already exist!',
              heightAuto: false,
              width: 400
            })
            //alert("Error while updating funds")
          }
        })

    }
  }

  clearFundsForm(){
    this.fundsForm.reset();
  }

}
