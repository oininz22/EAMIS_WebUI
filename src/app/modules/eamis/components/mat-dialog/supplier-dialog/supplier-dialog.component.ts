import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AddressService } from 'src/app/services/address.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { BarangayDTO } from 'src/shared/Models/BarangayDTO';
import { MunicipalityDTO } from 'src/shared/Models/MunicipalityDTO';
import { ProvinceDTO } from 'src/shared/Models/ProvinceDTO';
import { RegionDTO } from 'src/shared/Models/RegionDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.css']
})
export class SupplierDialogComponent implements OnInit {
actionBtn: string = "Save";
supplierForm: FormGroup;
dataSource: any;
region: RegionDTO[];
objectRegion: any;
objectProvince: any;
regionSelect: any;
province: ProvinceDTO[];
provinceSelect: any;
objectMunicipality: any;
municipality: MunicipalityDTO[];
municipalitySelect: any;
objectBarangay: any;
barangay: BarangayDTO[];
barangaySelect: any;
testVar: any;
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public editData: any,
  private microSvc: SupplierService, private dialogRef: MatDialogRef<SupplierDialogComponent>,
  private address: AddressService) { }

  ngOnInit(){
    this.supplierForm = this.formBuilder.group({
    id: [0],
    companyName: ['', [Validators.required]],
    regionCode: ['', [Validators.required]],
    provinceCode: ['', [Validators.required]],
    cityMunicipalityCode: ['', [Validators.required]],
    brgyCode: ['', [Validators.required]],
    street: ['', [Validators.required]],
    companyDescription: ['', [Validators.required]],
    contactPersonName: ['', [Validators.required]],
    contactPersonNumber: ['', [Validators.required]],
    bank: ['', [Validators.required]],
    accountName: ['', [Validators.required]],
    accountNumber: ['', [Validators.required]],
    branch: ['', [Validators.required]],
    isActive: [false, Boolean],
    companyAddress: [''],

    })
    this.getRegion();


    if(this.editData){
      this.actionBtn = "Update";
      this.regionSelect = this.editData.regionCode;
      this.provinceSelect = this.editData.provinceCode;
      this.municipalitySelect = this.editData.cityMunicipalityCode;
      this.barangaySelect = this.editData.brgyCode;
      this.getRegion();
      this.getProvince();
      this.getMunicipality();
      this.getBarangay();
      this.supplierForm.controls['id'].setValue(this.editData.id);
      this.supplierForm.controls['companyName'].setValue(this.editData.companyName);
      this.supplierForm.controls['regionCode'].setValue(this.editData.regionCode);
      this.supplierForm.controls['provinceCode'].setValue(this.editData.provinceCode);
      this.supplierForm.controls['cityMunicipalityCode'].setValue(this.editData.cityMunicipalityCode);
      this.supplierForm.controls['brgyCode'].setValue(this.editData.brgyCode);
      this.supplierForm.controls['street'].setValue(this.editData.street);
      this.supplierForm.controls['companyDescription'].setValue(this.editData.companyDescription);
      this.supplierForm.controls['contactPersonName'].setValue(this.editData.contactPersonName);
      this.supplierForm.controls['contactPersonNumber'].setValue(this.editData.contactPersonNumber);
      this.supplierForm.controls['bank'].setValue(this.editData.bank);
      this.supplierForm.controls['accountName'].setValue(this.editData.accountName);
      this.supplierForm.controls['accountNumber'].setValue(this.editData.accountNumber);
      this.supplierForm.controls['branch'].setValue(this.editData.branch);
      this.supplierForm.controls['isActive'].setValue(this.editData.isActive);
      console.log('editData works',this.editData)
      
    }
  
    

  }

  selectedRegion(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.regionSelect = trigger.value;
    this.testVar = this.regionSelect.regionDescription;
    console.log('trigger region works', this.regionSelect)
    this.getProvince();
  
  }

  selectedProvince(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.provinceSelect = trigger.value;
    this.getMunicipality();
  
  }

  selectedMunicipality(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.municipalitySelect = trigger.value;
    this.getBarangay();
  
  }

  selectedBarangay(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.barangaySelect = trigger.value;
  
  }

  getRegion(){
    this.address.findRegion().subscribe((response:RegionDTO) => {
      this.objectRegion = response;
      this.region = JSON.parse(JSON.stringify(this.objectRegion.items))
      console.log(this.region);
    })
  }

  getProvince(){
    this.address.findProvince(this.regionSelect).subscribe((response: ProvinceDTO) => {
      this.objectProvince = response;
      this.province = JSON.parse(JSON.stringify(this.objectProvince.items));
      console.log(this.province);
    })
  }



  getMunicipality(){
    this.address.findMunicipality(this.provinceSelect).subscribe((response: MunicipalityDTO) => {
      this.objectMunicipality = response;
      this.municipality = JSON.parse(JSON.stringify(this.objectMunicipality.items));
      console.log('this is municipality', this.municipality);
    })
  }

  getBarangay(){
    this.address.findBarangay(this.municipalitySelect).subscribe((response: BarangayDTO) => {
      this.objectBarangay = response;
      this.barangay = JSON.parse(JSON.stringify(this.objectBarangay.items));
      console.log('this is barangay', this.barangay);
    })
  }

  checkSupplier(trigger:MatCheckboxChange){
    console.log(trigger);
    return this.microSvc.checkSupplier(trigger);
  }


  clearSupplier(){
    this.supplierForm.reset();
  }

  addSupplier(){
    if(!this.editData){
      if(this.supplierForm.valid){
        this.supplierForm.value.isActive = this.microSvc.isActive;
        // var completeAddress = this.supplierForm.value.streetForm += this.barangaySelect.brgyDescription 
        // += this.provinceSelect.provinceDescription += this.regionSelect.regionDescription;
        // this.supplierForm.value.companyAddress = completeAddress;
        //console.log(completeAddress);
        this.microSvc.postSupplier(this.supplierForm.value)
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
       this.editSupplier();
     }

  }

  editSupplier(){
    if(this.supplierForm.valid){
      this.microSvc.updateSupplier(this.supplierForm.value)
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
