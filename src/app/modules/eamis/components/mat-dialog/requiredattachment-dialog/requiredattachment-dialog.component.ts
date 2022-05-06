import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequiredAttachmentService } from 'src/app/services/RequiredAttachment.service';
import { AttachmentDTO } from 'src/shared/Models/RequiredAttachmentDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requiredattachment-dialog',
  templateUrl: './requiredattachment-dialog.component.html',
  styleUrls: ['./requiredattachment-dialog.component.css']
})
export class RequiredattachmentDialogComponent implements OnInit {
  requiredAttachmentForm : FormGroup;
  actionBtn: string = "Save";
  FormTitle: string;
  alert: any;
  color: ThemePalette;
  isrequired: boolean;
  

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<RequiredattachmentDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private MicroSvc: RequiredAttachmentService) { }

  ngOnInit(){
    this.requiredAttachmentForm = this.formBuilder.group({
      id: [0],
      attachmentDescription: ['',Validators.required],
      attachmentTypeDescription : ['', Validators.required],
      otherAttachmentTypeDescription: this.formBuilder.array([]),
      is_Required : false,
    })
    
    // this.categoryForm = new FormGroup({
    //   category: new FormControl(''),
    // });
    // console.log(this.category);
    if(this.editData){
      this.actionBtn = "Update";
      this.requiredAttachmentForm.controls['id'].setValue(this.editData.id);
      this.requiredAttachmentForm.controls['attachmentDescription'].setValue(this.editData.attachmentDescription);
      this.requiredAttachmentForm.controls['is_Required'].setValue(this.editData.is_Required);
      this.requiredAttachmentForm.controls['attachmentTypeDescription'].setValue(this.editData.attachmentTypeDTO.map(t=>t.attachmentTypeDescription));
    }
  }

  check(trigger:MatCheckboxChange){
    return this.MicroSvc.check(trigger);
  }

  get otherAttachmentType(){
    return this.requiredAttachmentForm.get('otherAttachmentTypeDescription') as FormArray;
  }

  addAttachmentTypeDescription(){
    this.otherAttachmentType.push(this.formBuilder.control(''));
  }

  addRequiredAttachment(){
    if(!this.editData){
     if(this.requiredAttachmentForm.valid){
       this.requiredAttachmentForm.value.is_Required = this.MicroSvc.isrequired;
       this.MicroSvc.postRequiredAttachment('EamisAttachments/Add', this.requiredAttachmentForm.value)
       .subscribe({
         next:(res)=>{
           Swal.fire(
             ' ',
             'Added Successfully !',
             'success'
           )
           // alert("Pre-conditions added sucessfully");
           this.dialogRef.close('save');
           
         },
         error:()=>{
           alert("Error while adding the Attachment")
         }
       })
     }
    }else{
      this.putRequiredAttachment();
    }
   }

   putRequiredAttachment() {
    if(this.requiredAttachmentForm.valid){
      this.MicroSvc.updateRequiredAttachment('EamisAttachments/Edit?Id=', this.editData.id,this.requiredAttachmentForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire(
            ' ',
            'Updated Successfully !',
            'success'
          )
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while udpdating the Attachment")
        }
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  clearRequiredAttachment(){
    this.requiredAttachmentForm.reset();
  }

}
