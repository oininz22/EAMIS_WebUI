import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitofMeasureService } from 'src/app/services/UnitofMeasure.service';
import { UnitofMeasureDTO } from 'src/shared/Models/UnitofMeasureDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unitmeasure-dialog',
  templateUrl: './unitmeasure-dialog.component.html',
  styleUrls: ['./unitmeasure-dialog.component.css']
})
export class UnitmeasureDialogComponent implements OnInit {
  unitMeasureForm : FormGroup;
  actionBtn: string = "Save";
  FormTitle: string;
  alert: any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<UnitmeasureDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private MicroSvc: UnitofMeasureService) { }

  ngOnInit(){
    this.unitMeasureForm = this.formBuilder.group({
      id: [0],
      short_Description: ['', Validators.required],
      uom_Description : ['', Validators.required]
    })
    // this.categoryForm = new FormGroup({
    //   category: new FormControl(''),
    // });
    // console.log(this.category);
    console.log(this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.unitMeasureForm.controls['id'].setValue(this.editData.id);
      this.unitMeasureForm.controls['short_Description'].setValue(this.editData.short_Description);
      this.unitMeasureForm.controls['uom_Description'].setValue(this.editData.uom_Description);
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  clearUnitMeasure(){
    this.unitMeasureForm.reset();
  }

  addUnitMeasure(){
    if(!this.editData){
     if(this.unitMeasureForm.valid){
       this.MicroSvc.postUnitMeasure('EamisUnitofMeasure/Add', this.unitMeasureForm.value)
       .subscribe({
         next:(res)=>{
           Swal.fire(
             'SUCCESFULLY SAVED !',
             '',
             'success'
           )
           // alert("Pre-conditions added sucessfully");
           this.dialogRef.close('save');
           
         },
         error:()=>{
           alert("Error while adding the Unit of Measurements")
         }
       })
     }
    }else{
      this.putUnitMeasure();
    }
   }
   
   putUnitMeasure() {
    if(this.unitMeasureForm.valid){
      this.MicroSvc.updateUnitMeasure('EamisUnitofMeasure/Edit?Id=', this.editData.id, this.editData.parent_Id, this.unitMeasureForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire(
            'SUCESSFULLY UPDATED !',
            '',
            'success'
          )
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while udpdating the Unit of Measurements")
        }
      })
    }
  }

  // chkUnitofMeasurementExists(unitMeasureData : UnitofMeasureDTO): boolean{
  //   let uniofMeasure = this.editData; 
  //   let isUnitofMeasurementExists = false;
  //   for(let i=0;i<uniofMeasure.length;i++)
  //   {
  //     if (uniofMeasure[i].short_Description == unitMeasureData.short_Description && uniofMeasure[i].uom_Description == unitMeasureData.uom_Description)
  //     {
  //       isUnitofMeasurementExists = true;
  //     }
  //   }
  // return isUnitofMeasurementExists;
  // }

}
