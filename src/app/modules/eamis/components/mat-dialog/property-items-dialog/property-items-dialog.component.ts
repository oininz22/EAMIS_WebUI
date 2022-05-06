import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ItemCategoryService } from 'src/app/services/ItemCategory.service';
import { ItemSubCategoryService } from 'src/app/services/ItemSubCategory.service';
import { PropertyItemsService } from 'src/app/services/PropertyItems.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { UnitofMeasureService } from 'src/app/services/UnitofMeasure.service';
import { WarehouseServiceService } from 'src/app/services/WarehouseService.service';
import { ItemCategoryDTO } from 'src/shared/Models/ItemCategoryDTO';
import { ItemSubCategoryDTO } from 'src/shared/Models/ItemSubCategoryDTO';
import { SupplierDTO } from 'src/shared/Models/SupplierDTO';
import { UnitofMeasureDTO } from 'src/shared/Models/UnitofMeasureDTO';
import { WarehouseDTO } from 'src/shared/Models/WarehouseDTO';
import Swal from 'sweetalert2';

interface propertyType{
  propertyTypeName: string
}

@Component({
  selector: 'app-property-items-dialog',
  templateUrl: './property-items-dialog.component.html',
  styleUrls: ['./property-items-dialog.component.css']
})
export class PropertyItemsDialogComponent implements OnInit {
actionBtn: string = "Save";
propertyForm: FormGroup;
categoryObject: any;
category: ItemCategoryDTO[];
selectedCategoryName: any;
seletectCategoryId: any;
subCategoryObject: any;
subCategory: ItemSubCategoryDTO[];
uomObject: any;
uom: UnitofMeasureDTO[];
warehouseObject: any
warehouse: WarehouseDTO[];
supplierObject: any;
supplier: SupplierDTO[];

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PropertyItemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any, private MicroSvc: PropertyItemsService,
    private categorySvc: ItemCategoryService, private subCategorySvc: ItemSubCategoryService,
    private uomSvc: UnitofMeasureService, private warehouseSvc: WarehouseServiceService,
    private supplierSvc: SupplierService) { }


    property: propertyType[] = [
      {propertyTypeName: 'Consumables'},
      {propertyTypeName: 'Semi-expandable'},
      {propertyTypeName: 'PPE'},
      {propertyTypeName: 'Exemptions'},
    ];


  ngOnInit(){
    this.propertyForm = this.formBuilder.group({
      id: [0],
      isActive: [false, Boolean],
      propertyNo: [''],
      appNo: [''],
      propertyName: [''],
      categoryId: [''],
      subCategoryId: [''],
      brand: [''],
      uomId: [''],
      warehouseId: [''],
      propertyType: [''],
      model: [''],
      quantity: [''],
      supplierId: ['']
    })
    
    if (this.editData){
      this.actionBtn = "Update";
      this.seletectCategoryId = this.editData.categoryId;
      this.getItemSubCategoryList();
      this.propertyForm.controls['id'].setValue(this.editData.id);
      this.propertyForm.controls['isActive'].setValue(this.editData.isActive);
      this.propertyForm.controls['propertyNo'].setValue(this.editData.propertyNo);
      this.propertyForm.controls['appNo'].setValue(this.editData.appNo);
      this.propertyForm.controls['propertyName'].setValue(this.editData.propertyName);
      this.propertyForm.controls['categoryId'].setValue(this.editData.categoryId);
      this.propertyForm.controls['subCategoryId'].setValue(this.editData.subCategoryId);
      this.propertyForm.controls['brand'].setValue(this.editData.brand);
      this.propertyForm.controls['uomId'].setValue(this.editData.uomId);
      this.propertyForm.controls['warehouseId'].setValue(this.editData.warehouseId);
      this.propertyForm.controls['propertyType'].setValue(this.editData.propertyType);
      this.propertyForm.controls['model'].setValue(this.editData.model);
      this.propertyForm.controls['quantity'].setValue(this.editData.quantity);
      this.propertyForm.controls['supplierId'].setValue(this.editData.supplierId);
      console.log('this is editData', this.editData);
    }

    this.getCategoryList();
    this.getUnitOfMeasureList();
    this.getWarehouseList();
    this.getSupplierList();
  }

  getSupplierList(){
    return this.supplierSvc.getSupplier().subscribe((response: SupplierDTO)=> {
      this.supplierObject = response;
      this.supplier = JSON.parse(JSON.stringify(this.supplierObject.items));
    })
  }

  getWarehouseList(){
    this.warehouseSvc.getWarehouse().subscribe((response: WarehouseDTO) => {
      this.warehouseObject = response;
      this.warehouse = JSON.parse(JSON.stringify(this.warehouseObject.items));
    })
  }

  getUnitOfMeasureList(){
    this.uomSvc.getUomList().subscribe((response: UnitofMeasureDTO) => {
      this.uomObject = response;
      this.uom = JSON.parse(JSON.stringify(this.uomObject.items));
    })
  }

  selectedCategory(trigger:MatSelectChange){
    //this.selectedCategoryName = trigger.value.shortDesc;
    this.seletectCategoryId = trigger.value;
    console.log(this.selectedCategoryName);
    //this.propertyForm.controls['propertyNo'].setValue(this.selectedCategoryName+"0000001");
    this.getItemSubCategoryList();
  
  }

  getItemSubCategoryList(){
    this.subCategorySvc.getItemSubCategoryByCategory(this.seletectCategoryId).subscribe((response: ItemSubCategoryDTO) => {
      this.subCategoryObject = response;
      this.subCategory = JSON.parse(JSON.stringify(this.subCategoryObject.items));
    })
  }

  getCategoryList(){
    this.categorySvc.getItemCategory(true).subscribe((response: ItemCategoryDTO) => {
      this.categoryObject = response;
      this.category = JSON.parse(JSON.stringify(this.categoryObject.items));
      console.log(this.category);
    })
  }

  checkActive(trigger:MatCheckboxChange){
    return this.MicroSvc.checkActivated(trigger);
  }

  addProperty(){
    if(!this.editData){
      if(this.propertyForm.valid){
        this.propertyForm.value.isActive = this.MicroSvc.isActive;
        //this.propertyForm.value.categoryId = this.seletectCategoryId;
        this.MicroSvc.postProperty(this.propertyForm.value)
        .subscribe({
          next:(res)=> {
            Swal.fire({
              title: 'Added Successfully !',
              icon: 'success',
              heightAuto: false,
              width: 400
            })
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the procurement category")
          }
        })
      }
    }else{
      this.editProperty();
    }
  }

  editProperty(){
    if(this.propertyForm.valid){
      this.MicroSvc.updateProperty(this.editData.id, this.propertyForm.value)
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
          alert("Error while udpdating the procurement category")
        }
      })
    }
  }


  clearProperty(){
    this.propertyForm.reset();
  }

}
