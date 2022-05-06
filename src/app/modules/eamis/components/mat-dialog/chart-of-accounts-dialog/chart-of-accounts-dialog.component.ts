import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { first } from 'rxjs/operators';
import { ChartofAccountServiceService } from 'src/app/services/ChartOfAccountService.service';
import { ChartofAccountsDTO } from 'src/shared/Models/ChartofAccountsDTO';
import { ClassificationDTO } from 'src/shared/Models/ClassificationDTO';
import { GenChartOfAccountDTO } from 'src/shared/Models/GenChartOfAccountDTO';
import { GroupClassificationDTO } from 'src/shared/Models/GroupClassificationDTO';
import { SubClassificationDTO } from 'src/shared/Models/SubClassificationDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chart-of-accounts-dialog',
  templateUrl: './chart-of-accounts-dialog.component.html',
  styleUrls: ['./chart-of-accounts-dialog.component.css']
})
export class ChartOfAccountsDialogComponent implements OnInit {
  chartofAccountsForm : FormGroup;
  microsvc: ChartofAccountServiceService;
  actionBtn: string = "Save";
  FormTitle: string;
  alert: any;
  color: ThemePalette;
  Status: boolean;
  isInventoryItem: boolean;
  isActive: boolean;
  dataClassification : ClassificationDTO
  objectClassification : any
  dataSubClassification : SubClassificationDTO
  objectSubClassification : any
  dataGroupClassification : GroupClassificationDTO
  objectGroupClassification : any
  trigger:any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ChartOfAccountsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private MicroSvc: ChartofAccountServiceService) { 
    this.microsvc = MicroSvc;
    }

  ngOnInit() {
    this.getClassificationList();
  
    this.chartofAccountsForm = this.formBuilder.group({
      id: [0],
      groupId: [0],
      classificationId : ['', Validators.required],
      subClassificationId : ['', Validators.required],
      classificationGroupId : ['', Validators.required],
      objectCode : ['', Validators.required],
      accountCode : ['', Validators.required],
      isPartofInventroy : false,
      isActive : false,
      
    })
    if(this.editData){
    
      this.actionBtn = "Update"
      this.chartofAccountsForm.controls['id'].setValue(this.editData.id);
      this.chartofAccountsForm.controls['groupId'].setValue(this.editData.groupId);
      this.chartofAccountsForm.controls['classificationId'].setValue(this.editData.classificationDTO.id);
      this.chartofAccountsForm.controls['subClassificationId'].setValue(this.editData.subClassificationDTO.id);
      this.chartofAccountsForm.controls['classificationGroupId'].setValue(this.editData.groupClassificationDTO.id);
      this.chartofAccountsForm.controls['objectCode'].setValue(this.editData.objectCode);
      this.chartofAccountsForm.controls['accountCode'].setValue(this.editData.accountCode);
      this.chartofAccountsForm.controls['isPartofInventroy'].setValue(this.editData.isPartofInventroy);
      this.chartofAccountsForm.controls['isActive'].setValue(this.editData.isActive);
      console.log(this.editData);
      // console.log(this.editData.id);
      // console.log(this.editData.subClassificationDTO.id, this.editData.subClassificationDTO.nameSubClassification);
      // console.log(this.editData.groupClassificationDTO.id, this.editData.groupClassificationDTO.nameGroupClassification);
      // console.log(this.editData.classificationDTO.id,this.editData.classificationDTO.nameClassification);
      
    }
  }

  checkstatus(trigger:MatCheckboxChange){
    return this.MicroSvc.checkstatus(trigger);
  }

  addChartofAccounts(){
    if(!this.editData){
     if(this.chartofAccountsForm.valid){
       this.chartofAccountsForm.value.groupId = this.MicroSvc.classificationGroupId;
       this.chartofAccountsForm.value.isInventoryItem = this.MicroSvc.isInventoryItem;
       this.chartofAccountsForm.value.isActive = this.MicroSvc.isActive;
       this.MicroSvc.postChartofAccounts('EamisChartofAccounts/Add', this.chartofAccountsForm.value)
       .subscribe({
         next:(res)=>{
           Swal.fire(
             'SUCCESSFULLY SAVED !',
             '',
             'success'
           )
           // alert("Pre-conditions added sucessfully");
           this.dialogRef.close('save');
           
         },
         error:()=>{
           alert("Error while adding the Chart of Accounts")
         }
       })
     }
    }else{
      this.putChartofAccounts();
    }
   }

   putChartofAccounts() {
    if(this.chartofAccountsForm.valid){
      this.MicroSvc.updateChartofAccounts('EamisChartofAccounts/Edit?Id=', this.editData.id,this.chartofAccountsForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire(
            'SUCCESFULLY UPDATED !',
            '',
            'success'
          )
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while udpdating the Chart of Accounts")
        }
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  clearChartofAccounts(){
    this.chartofAccountsForm.reset();
  }

  getClassificationList() {
    this.MicroSvc.findClassification('EamisClassification/list').pipe(first()).subscribe((response: ClassificationDTO) => {
      this.objectClassification = response;
      this.dataClassification = JSON.parse(JSON.stringify(this.objectClassification.items))
      if(this.editData){
        this.microsvc.classificationId = this.editData.classificationDTO.id;
        this.getSubClassificationList();
        this.microsvc.subClassificationId = this.editData.groupClassificationDTO.subClassificationId;
        this.getGroupClassificationList();
      }
     
      console.log('this is Classification', this.dataClassification);
      
    }) 
  }

  selectedClassification(trigger:MatSelectChange){
    console.log('trigger is working classification', trigger.value);
    this.microsvc.classificationId = trigger.value;
    this.getSubClassificationList();
    return this.MicroSvc.selectedbyClassification(trigger.value);
  }

  getSubClassificationList() {
    //console.log('this is classification id', this.editData.classificationDTO.id)
    this.MicroSvc.findSubClassification('EamisSubClassification/list', this.microsvc.classificationId).pipe(first()).subscribe((response: SubClassificationDTO) => {
      this.objectSubClassification = response;
      this.dataSubClassification = JSON.parse(JSON.stringify(this.objectSubClassification.items))
      if(this.editData)
      this.microsvc.subClassificationId = this.editData.groupClassificationDTO.subClassificationId;
      console.log('this is Subclassification', this.dataSubClassification);
      
    }) 
  }

  selectedSubClassification(trigger:MatSelectChange){
    console.log('trigger is working subclassification', trigger.value);
    this.microsvc.subClassificationId = trigger.value;
    this.getGroupClassificationList();
    return this.MicroSvc.selectedbySubClassification(trigger.value);
  }

  getGroupClassificationList(){
    this.MicroSvc.findGroupClassification('EamisGroupClassification/list', this.MicroSvc.classificationId, this.MicroSvc.subClassificationId).pipe(first()).subscribe((response: GroupClassificationDTO) => {
      this.objectGroupClassification = response;
      this.dataGroupClassification = JSON.parse(JSON.stringify(this.objectGroupClassification.items))
     
      console.log('this is GroupClassification', this.dataGroupClassification);
    }) 
  }

  selectedGroupClassifcation(trigger:MatSelectChange){
    console.log('trigger is working groupclassification', trigger.value);
    this.microsvc.classificationGroupId = trigger.value;
    this.getGroupClassificationList();
    return this.MicroSvc.selectedbyGroupClassification(trigger.value);
  }

}


