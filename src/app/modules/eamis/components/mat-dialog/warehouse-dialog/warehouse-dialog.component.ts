import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { first } from 'rxjs/operators';
import { WarehouseServiceService } from 'src/app/services/WarehouseService.service';
import { BarangayDTO } from 'src/shared/Models/BarangayDTO';
import { MunicipalityDTO } from 'src/shared/Models/MunicipalityDTO';
import { ProvinceDTO } from 'src/shared/Models/ProvinceDTO';
import { RegionDTO } from 'src/shared/Models/RegionDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styleUrls: ['./warehouse-dialog.component.css']
})
export class WarehouseDialogComponent implements OnInit {
  warehouseForm : FormGroup;
  microsvc: WarehouseServiceService;
  actionBtn: string = "Save";
  FormTitle: string;
  alert: any;
  dataSource : any;
  region: RegionDTO;
  province: any;
  municipality: any;
  barangay : any;
  object: any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<WarehouseDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private MicroSvc: WarehouseServiceService) { 
    this.microsvc = MicroSvc; }

  ngOnInit(): void {
    this.getRegionList();
    //this.getProvinceList();
    //this.getMunicipalityList();
    //this.getBarangayList();
    this.warehouseForm = this.formBuilder.group({
      id: [0],
      warehouse_Description : ['', Validators.required],
      street_Name : ['', Validators.required],
      barangay_Code : ['', Validators.required],
      municipality_Code : ['', Validators.required],
      region_Code : ['', Validators.required],
      province_Code : ['', Validators.required]
    })

    console.log(this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.microsvc.regioncode = this.editData.barangay.region.regionCode;
      this.microsvc.provincecode = this.editData.barangay.province.provinceCode;
      this.microsvc.municipalitycode = this.editData.barangay.municipality.cityMunicipalityCode;
      this.microsvc.barangayCode = this.editData.barangay.brgyCode;
      this.getRegionList();
      this.getProvinceList();
      this.getMunicipalityList();
      this.getBarangayList();
      this.warehouseForm.controls['id'].setValue(this.editData.id);
      this.warehouseForm.controls['warehouse_Description'].setValue(this.editData.warehouse_Description);
      this.warehouseForm.controls['street_Name'].setValue(this.editData.street_Name);
      this.warehouseForm.controls['barangay_Code'].setValue(this.editData.barangay.brgyCode);
      this.warehouseForm.controls['municipality_Code'].setValue(this.editData.barangay.municipality.cityMunicipalityCode);
      this.warehouseForm.controls['region_Code'].setValue(this.editData.barangay.region.regionCode);
      this.warehouseForm.controls['province_Code'].setValue(this.editData.barangay.province.provinceCode);
  }
}

  addWarehouse(){
    if(!this.editData){
     if(this.warehouseForm.valid){
       console.log(this.warehouseForm.value);
       this.MicroSvc.postWarehouse('EamisWarehouse/Add', this.warehouseForm.value)
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
           alert("Error while adding the Warehouse")
         }
       })
     }
    }else{
      this.putWarehouse();
    }
   }
  putWarehouse() {
    if(this.warehouseForm.valid){
      this.MicroSvc.updateWarehouse('EamisWarehouse/Edit?Id=', this.editData.id, this.warehouseForm.value)
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
          alert("Error while udpdating the Warhouse")
        }
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  clearWarehouse(){
    this.warehouseForm.reset();
  }

  getRegionList() {
    this.MicroSvc.findRegion('EamisRegion/list').pipe(first()).subscribe((response: RegionDTO) => {
      this.object = response;
      this.region = JSON.parse(JSON.stringify(this.object.items))
     
      console.log('this is region', this.region);
      console.log('this is selected region', this.region)
      
    }) 
  }

  selectedRegion(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.microsvc.regioncode = trigger.value;
    this.getProvinceList();
    return this.MicroSvc.selectedbyRegion(trigger.value);
  }

  getProvinceList() {
    this.MicroSvc.findProvince('EamisProvince/list', this.microsvc.regioncode).pipe(first()).subscribe((response: ProvinceDTO) => {
      this.province = response;
     
     
      console.log('this is province', this.province);
      
    }) 
  }

  selectedProvince(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.microsvc.provincecode = trigger.value;
    this.getMunicipalityList();
    return this.MicroSvc.selectedbyProvince(trigger.value);
  }

  getMunicipalityList() {
    this.MicroSvc.findMunicipality('EamisMunicipality/list', this.microsvc.provincecode).pipe(first()).subscribe((response: MunicipalityDTO) => {
      this.municipality = response;
    
      console.log('this is city', this.municipality);
     
      
    }) 
  }

  selectedMunicipality(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.microsvc.municipalitycode = trigger.value;
    this.getBarangayList();
    return this.MicroSvc.selectedbyMunicipality(trigger.value);
  }

  getBarangayList() {
    this.MicroSvc.findBarangay('EamisBarangay/list', this.MicroSvc.municipalitycode).pipe(first()).subscribe((response: BarangayDTO) => {
      this.barangay = response;
      
      console.log('this is barangay', this.barangay);
      
    }) 
  }

  selectedBarangay(trigger:MatSelectChange){
    console.log('trigger is working', trigger.value);
    this.microsvc.barangayCode = trigger.value;
    this.getBarangayList();
    return this.MicroSvc.selectedbyBarangay(trigger.value);
  }

}
