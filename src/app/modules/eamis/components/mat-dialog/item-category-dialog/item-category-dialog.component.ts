import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ChartofAccountServiceService } from 'src/app/services/ChartOfAccountService.service';
import { ItemCategoryService } from 'src/app/services/ItemCategory.service';
import { AisOfficeDTO } from 'src/shared/Models/AisOfficeDTO';
import { ChartofAccountsDTO } from 'src/shared/Models/ChartofAccountsDTO';
import Swal from 'sweetalert2';

interface costMethod {
  costMethodName: string;
}

interface depreciationMethod {
  depreciationName: string;
}


@Component({
  selector: 'app-item-category-dialog',
  templateUrl: './item-category-dialog.component.html',
  styleUrls: ['./item-category-dialog.component.css']
})


export class ItemCategoryDialogComponent implements OnInit {
itemCategoryForm: FormGroup;
actionBtn: string = "Save";
objectChartOfAccount: any;
chartOfAccounts: ChartofAccountsDTO[];
objectAisOffice: any;
aisOffice: AisOfficeDTO[];
selectedAccountCodeName: any;
selectedAccountCode: any
supplies: Boolean;


  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ItemCategoryDialogComponent>,
    private microSvc: ItemCategoryService, @Inject(MAT_DIALOG_DATA) public editData: any,
    private chartSvc: ChartofAccountServiceService) { }

    depreciation: depreciationMethod[] = [
      {depreciationName: 'Straight Line (Default)'}
    ]

    cost: costMethod[] = [
      {costMethodName: 'Weighted Average'},
      {costMethodName: 'First In, First Out'},
      {costMethodName: 'Last In, First Out'},
      {costMethodName: 'Moving Average'},
      {costMethodName: 'First Expiry, First Out'},
    ];

  ngOnInit(){

    this.itemCategoryForm = this.formBuilder.group({
      id: [0],
      shortDesc: ['', Validators.required],
      categoryName: ['', Validators.required],
      chartOfAccountId: ['', Validators.required],
      // officeId: ['', Validators.required],
      costMethod: ['', Validators.required],
      depreciationMethod: ['Straight Line (Default)'],
      estimatedLife: [0],
      isSupplies: [false, Boolean],
      isAsset: [false, Boolean],
      isSerialized: [false, Boolean],
      isStockable: [false, Boolean],
      isActive: [false, Boolean]
    })


    //console.log(this.supplies);
      //this.itemCategoryForm.controls['depreciationMethod'].setValue("Straight Line (Default)");
      

    if(this.editData){
      
      this.actionBtn = "Update";
      if (this.editData.isSupplies == true){
        this.supplies = true;
        this.itemCategoryForm.controls['depreciationMethod'].setValue('');
      }else if (this.editData.isSupplies == true){
        this.supplies = false;
        this.itemCategoryForm.controls['depreciationMethod'].setValue('Straight Line (Default)');
      }
      else {
        this.itemCategoryForm.controls['depreciationMethod'].setValue(this.editData.depreciationMethod);
      }
      this.itemCategoryForm.controls['id'].setValue(this.editData.id);
      this.itemCategoryForm.controls['shortDesc'].setValue(this.editData.shortDesc);
      this.itemCategoryForm.controls['categoryName'].setValue(this.editData.categoryName);
      this.itemCategoryForm.controls['chartOfAccountId'].setValue(this.editData.chartOfAccountId);
      // this.itemCategoryForm.controls['officeId'].setValue(this.editData.officeId);
      this.itemCategoryForm.controls['costMethod'].setValue(this.editData.costMethod);
      this.itemCategoryForm.controls['estimatedLife'].setValue(this.editData.estimatedLife);
      this.itemCategoryForm.controls['isSupplies'].setValue(this.editData.isSupplies);
      this.itemCategoryForm.controls['isAsset'].setValue(this.editData.isAsset);
      this.itemCategoryForm.controls['isSerialized'].setValue(this.editData.isSerialized);
      this.itemCategoryForm.controls['isStockable'].setValue(this.editData.isStockable);
      this.itemCategoryForm.controls['isActive'].setValue(this.editData.isActive);
      //this.itemCategoryForm.controls['officeId'].setValue(this.editData.officeId);
      console.log(this.editData.isSupplies);
    }

    this.getChartOfAccounts();
    this.getAisOfficeList();

    

  }

  getShortDescErrorMsg(){
    if(this.itemCategoryForm.controls['shortDesc'].hasError('required')){
      return "Short Description is required"
    }
  }

  getCategoryNameErrorMsg(){
    if(this.itemCategoryForm.controls['categoryName'].hasError('required')){
      return "Category Name is required"
    }
  }

  getAccountCodeErrorMsg(){
    if(this.itemCategoryForm.controls['chartOfAccountId'].hasError('required')){
      return "Account Code is required"
    }
  }

  getCostMethodErrorMsg(){
    if(this.itemCategoryForm.controls['costMethod'].hasError('required')){
      return "Cost Method is required"
    }
  }

  getAisOfficeList(){
    this.microSvc.getAisOffice().subscribe((response: AisOfficeDTO) => {
      this.objectAisOffice = response;
      this.aisOffice = JSON.parse(JSON.stringify(this.objectAisOffice.items));
      //console.log('AISOffice works',this.aisOffice);
    })
  }

  getChartOfAccounts(){
    this.chartSvc.chartOfAccountList().subscribe((response: ChartofAccountsDTO) => {
      this.objectChartOfAccount = response;
      this.chartOfAccounts = JSON.parse(JSON.stringify(this.objectChartOfAccount.items))
      //console.log('Chart of Account works', this.chartOfAccounts);
    })
  }

  selectedAccount(trigger:MatSelectChange){
    this.selectedAccountCode = trigger.value;
    //this.selectedAccountCodeName = trigger.value.accountCode+' '+trigger.value.objectCode;
    console.log('trigger is working', trigger.value);
  
  }

  checkedSupplies(trigger:MatCheckboxChange){
    this.supplies = trigger.checked;
    console.log(this.supplies)

    if(this.supplies == true){
      this.supplies = true;
      this.itemCategoryForm.controls['depreciationMethod'].setValue('');
    }else{
      this.supplies = false;
      this.itemCategoryForm.controls['depreciationMethod'].setValue('Straight Line (Default)');
    }
    
    return this.microSvc.checkSupplies(trigger);
  }

  checkedAsset(trigger:MatCheckboxChange){
    return this.microSvc.checkAsset(trigger);
  }

  checkSerialized(trigger:MatCheckboxChange){
    console.log(trigger.checked);

    return this.microSvc.checkSerialized(trigger);
  }

  checkStockable(trigger:MatCheckboxChange){
    return this.microSvc.checkStockable(trigger);
  }

  checkActive(trigger:MatCheckboxChange){
    return this.microSvc.checkActive(trigger);
  }

  clearItemCategory(){
    this.itemCategoryForm.controls['shortDesc'].reset();
    this.itemCategoryForm.controls['categoryName'].reset();
    this.itemCategoryForm.controls['chartOfAccountId'].reset();
    this.itemCategoryForm.controls['costMethod'].reset();
    this.itemCategoryForm.controls['estimatedLife'].reset();
  }

  addItemCategory(){
    if(!this.editData){
      if(this.itemCategoryForm.valid){
        this.itemCategoryForm.value.isSupplies = this.microSvc.isSupplies;
        this.itemCategoryForm.value.isAsset = this.microSvc.isAsset;
        this.itemCategoryForm.value.isSerialized = this.microSvc.isSerialized;
        this.itemCategoryForm.value.isStockable = this.microSvc.isStockable;
        this.itemCategoryForm.value.isActive = this.microSvc.isActive;
        this.itemCategoryForm.value.depreciationMethod = this.microSvc.depreciationMethond;
        
        //this.itemCategoryForm.value.accountCodeName = this.selectedAccountCodeName;
        this.microSvc.postItemCategory(this.itemCategoryForm.value)
        .subscribe({
          next:(res)=>{
           
            Swal.fire({
              title: 'Added Successfully!',
              // text: 'Added Successfully !',
              icon: 'success',
              heightAuto: false,
              width: 400
            })
            // alert("Procurement Category added sucessfully");
            this.dialogRef.close('save');
            
          },
          error:()=>{
            Swal.fire({
              icon: 'error',
              title: 'Item category short description is already exist!',
              heightAuto: false,
              width: 400
            })
            //alert("Error while adding the procurement category")
          }
        })
      }
     }else{
       this.editItemCategory();
     }
    
  }

  editItemCategory(){
    if(this.itemCategoryForm.valid){
      this.itemCategoryForm.value.accountCode = this.selectedAccountCode;
      //this.itemCategoryForm.value.depreciationMethod = this.microSvc.depreciationMethond;
      this.microSvc.updateItemCategory(this.itemCategoryForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire({
            title: 'Updated Successfully!',
            // text: 'Updated Successfully !',
            icon: 'success',
            heightAuto: false,
            width: 400
          })
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while udpdating the item category")
        }
      })
    }
  }

}
