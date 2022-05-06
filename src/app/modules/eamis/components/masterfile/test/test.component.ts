import { FlatTreeControl } from '@angular/cdk/tree';
import { ThrowStmt } from '@angular/compiler';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { ItemCategoryService } from 'src/app/services/ItemCategory.service';
import { ItemSubCategoryService } from 'src/app/services/ItemSubCategory.service';
import { ProcurementCategoryService } from 'src/app/services/ProcurementCategory.service';
import { PropertyItemsService } from 'src/app/services/PropertyItems.service';
import { ItemCategoryDTO } from 'src/shared/Models/ItemCategoryDTO';
import { ItemSubCategoryDTO } from 'src/shared/Models/ItemSubCategoryDTO';
import { PropertyItemsDTO } from 'src/shared/Models/PropertyItemsDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})


export class TestComponent implements OnInit {
values = [];
actionBtn: string = "Save";
itemSubCategoryForm: FormGroup;
categoryItem: ItemCategoryDTO[];
itemSubCategory: ItemSubCategoryDTO[];
selectedItemCategory: any;
objectCategory: any;

  constructor(private microSvc: ItemSubCategoryService, private formBuilder: FormBuilder,
    private category: ItemCategoryService){

  }


  ngOnInit(){
    this.itemSubCategoryForm = this.formBuilder.group({
      id: [0],
      categoryId: [0],
      subCategoryName: ['', Validators.required]
    })

    this.getSubCategory();
    
  }

  getSubCategory(){
    this.category.getItemCategory(true).subscribe((response: ItemCategoryDTO) => {
      this.objectCategory = response;
      this.categoryItem = JSON.parse(JSON.stringify(this.objectCategory.items));
      console.log(this.categoryItem);
    })
  }

  selectedCategory(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.selectedItemCategory = trigger.value;
  
  }

  removevalue(i){
    this.values.splice(i,1);
  }

  addvalue(){
    this.values.push({value: ""});
  }

  addItemSubCategory(){
    if(this.itemSubCategoryForm.valid){
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
          
        },
        error:()=>{
          alert("Error while adding the procurement category")
        }
      })
    }
  }
      
    
}

  




