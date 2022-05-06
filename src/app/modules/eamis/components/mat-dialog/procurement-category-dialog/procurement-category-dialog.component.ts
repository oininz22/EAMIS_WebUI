import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcurementCategoryService } from 'src/app/services/ProcurementCategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procurement-category-dialog',
  templateUrl: './procurement-category-dialog.component.html',
  styleUrls: ['./procurement-category-dialog.component.css']
})
export class ProcurementCategoryDialogComponent implements OnInit {
  categoryForm : FormGroup;
  actionBtn: string = "Save";
  FormTitle: string;
  alert: any;
  isActive: boolean;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ProcurementCategoryDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private MicroSvc: ProcurementCategoryService) { }

  ngOnInit(){
    this.categoryForm = this.formBuilder.group({
      id: [0],
      procurementDescription : ['', [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
      isActive: [false, Boolean]
    })

    console.log(this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.categoryForm.controls['id'].setValue(this.editData.id);
      this.categoryForm.controls['procurementDescription'].setValue(this.editData.procurementDescription);
      this.categoryForm.controls['isActive'].setValue(this.editData.isActive);
    }
  }

  getProcurementDescErrorMessage(){
    if(this.categoryForm.controls['procurementDescription'].hasError('required')){
      return 'Category Description is required';
    }
  }

  checkActive(trigger:MatCheckboxChange){
    if (trigger.checked == true){
      this.isActive = true;
    }
    else{
      this.isActive = false;
    }
  }

  addCategory(){
    if(!this.editData){
     if(this.categoryForm.valid){
       this.categoryForm.value.isActive = this.isActive;
       this.MicroSvc.postCategory('EamisProcurementCategory/Add', this.categoryForm.value)
       .subscribe({
         next:(res)=>{  
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
             title: 'Procurement description is already exist!',
             heightAuto: false,
             width: 400
           })
          //  alert("Error while adding the procurement category")
         }
       })
     }
    }else{
      this.putCategory();
    }
   }

   putCategory(){
    if(this.categoryForm.valid){
      this.MicroSvc.updateCategory('EamisProcurementCategory/Edit?Id=', this.editData.id, this.categoryForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire({
            title: 'Updated Successfully !',
            icon: 'success',
            heightAuto: false,
            width: 400
          })
          this.dialogRef.close('update');
        },
        error:()=>{
          Swal.fire({
            icon: 'error',
            title: 'Procurement description is already exist!',
            heightAuto: false,
            width: 400
          })
          //alert("Error while udpdating the procurement category")
        }
      })
    }
  }
  
  closeDialog(){
    this.dialogRef.close();
  }

  clearCategory(){
    this.categoryForm.reset();
  }

}


