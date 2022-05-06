import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ItemCategoryService } from 'src/app/services/ItemCategory.service';
import { ItemSubCategoryService } from 'src/app/services/ItemSubCategory.service';
import { ItemCategoryDTO } from 'src/shared/Models/ItemCategoryDTO';
import { ItemSubCategoryDTO } from 'src/shared/Models/ItemSubCategoryDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-sub-category-dialog',
  templateUrl: './item-sub-category-dialog.component.html',
  styleUrls: ['./item-sub-category-dialog.component.css']
})
export class ItemSubCategoryDialogComponent implements OnInit {
actionBtn: string = "Save";
itemSubCategoryForm: FormGroup;
objectCategory: any;
categoryItem: ItemCategoryDTO[];
selectedItemCategory: string;
isActive: Boolean;

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData: any,
  private microSvc: ItemSubCategoryService, private dialogRef: MatDialogRef<ItemSubCategoryDialogComponent>,
  private category: ItemCategoryService) { }

  ngOnInit(){
    this.itemSubCategoryForm = this.formBuilder.group({
      id: [0],
      categoryId: [0],
      subCategoryName: ['', Validators.required],
      isActive: [false, Boolean]
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.itemSubCategoryForm.controls['id'].setValue(this.editData.id);
      this.itemSubCategoryForm.controls['categoryId'].setValue(this.editData.categoryId);
      this.itemSubCategoryForm.controls['subCategoryName'].setValue(this.editData.subCategoryName);
      this.itemSubCategoryForm.controls['isActive'].setValue(this.editData.isActive);
    }

    this.getItemCategory();
  }

  getItemCategory(){
    this.category.getItemCategory(true).subscribe((response: ItemCategoryDTO) => {
      this.objectCategory = response;
      this.categoryItem = JSON.parse(JSON.stringify(this.objectCategory.items));
      console.log('this is category',this.categoryItem);
    })
  }

  selectedCategory(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.selectedItemCategory = trigger.value;
  
  }

  checkActive(trigger:MatCheckboxChange){
    if (trigger.checked == true){
      this.isActive = true;
    }
    else{
      this.isActive = false;
    }
  }

  clearItemSubCategory(){
    this.itemSubCategoryForm.reset();
  }

  addItemSubCategory(){
    if(!this.editData){
      if(this.itemSubCategoryForm.valid){
        this.itemSubCategoryForm.value.isActive = this.isActive;
        this.microSvc.postItemSubCategory(this.itemSubCategoryForm.value)
        .subscribe({
          next:(res)=>{
           
            Swal.fire({
              title: 'Added Successfully !',
              // text: 'Added Successfully !',
              icon: 'success',
              heightAuto: false,
              width: 400
            })
            // alert("Procurement Category added sucessfully");
            this.dialogRef.close('save');
            
          },
          error:()=>{
            alert("Error while adding the procurement category")
          }
        })
      }
     }else{
       this.editItemSubCategory();
     }
  }

  editItemSubCategory(){
    if(this.itemSubCategoryForm.valid){
      this.microSvc.updateItemCategory(this.itemSubCategoryForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire({
            title: 'Updated Successfully !',
            // text: 'Updated Successfully !',
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

}
