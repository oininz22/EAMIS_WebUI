import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreconditionsService } from 'src/app/services/Preconditions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-precondition-dialog',
  templateUrl: './precondition-dialog.component.html',
  styleUrls: ['./precondition-dialog.component.css']
})
export class PreconditionDialogComponent implements OnInit {
  preconditionsForm : FormGroup;
  actionBtn: string = "Save";
  FormTitle: string;
  alert: any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PreconditionDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private MicroSvc: PreconditionsService) { }

  ngOnInit(){
    this.preconditionsForm = this.formBuilder.group({
      id: [0],
      parent_Id : [0],
      precondition_Description : ['', Validators.required]
    })    
    
    if(this.editData){
      this.actionBtn = "Update";
      this.preconditionsForm.controls['id'].setValue(this.editData.id);
      this.preconditionsForm.controls['parent_Id'].setValue(this.editData.parent_Id);
      this.preconditionsForm.controls['precondition_Description'].setValue(this.editData.precondition_Description);
    }
  }

  getPreconditionDescErrorMessage(){
    if(this.preconditionsForm.controls['precondition_Description'].hasError('required')){
      return 'Pre-condition Description is required';
    }
  }

  addPreconditions(){
    if(!this.editData){
     if(this.preconditionsForm.valid){
       this.MicroSvc.postPreconditions('EamisPreconditions/Add', this.preconditionsForm.value)
       .subscribe({
         next:(res)=>{
           Swal.fire({
            title: 'Added Successfully!',
            icon: 'success',
            heightAuto: false,
            width: 400
           })
           // alert("Pre-conditions added sucessfully");
           this.dialogRef.close('save');
           
         },
         error:()=>{
           alert("Error while adding the Pre-conditions")
         }
       })
     }
    }else{
      this.putPreconditions();
    }
   }

   putPreconditions() {
    if(this.preconditionsForm.valid){
      this.MicroSvc.updatePreconditions('EamisPreconditions/Edit?Id=', this.editData.id, this.editData.parent_Id, this.preconditionsForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire({
            title: 'Updated Successfully!',
            icon: 'success',
            heightAuto: false,
            width: 400
          })
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while udpdating the Pre-conditions")
        }
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  clearPreconditions(){
    this.preconditionsForm.reset();
  }

}
