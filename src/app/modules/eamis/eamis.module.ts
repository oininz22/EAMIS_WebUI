import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EamisRoutingModule } from './eamis-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { PropertyItemsComponent } from './components/masterfile/property-items/property-items.component';
import { EnvironmentalAspectsComponent } from './components/masterfile/environmental-aspects/environmental-aspects.component';
import { EnvironmentalImpactsComponent } from './components/masterfile/environmental-impacts/environmental-impacts.component';
import { ProcurementCategoryComponent } from './components/masterfile/procurement-category/procurement-category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HasRoleDirective } from './components/directives/has-role.directive';
import { MatMenuModule } from '@angular/material/menu';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { MatInputModule } from '@angular/material/input';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RequiredattachmentModalComponent } from './components/transaction/requiredattachment-modal/requiredattachment-modal.component';
import { PreConditionsComponent } from './components/masterfile/pre-conditions/pre-conditions.component';
import { ReceivedPropertyComponent } from './components/transaction/received-property/received-property.component';
import { PropertyDetailsComponent } from './components/transaction/property-details/property-details.component';
import { RequiredAttachmentComponent } from './components/masterfile/required-attachment/required-attachment.component';
import { UnitOfMeasureComponent } from './components/masterfile/unit-of-measure/unit-of-measure.component';
import { RoleManagerComponent } from './components/role-manager/role-manager.component';
import { TestComponent } from './components/masterfile/test/test.component';
import { PropertyItemsDialogComponent } from './components/mat-dialog/property-items-dialog/property-items-dialog.component';
import { EnvironmentalAspectsDialogComponent } from './components/mat-dialog/environmental-aspects-dialog/environmental-aspects-dialog.component';
import { UserRegistrationDialogComponent } from './components/mat-dialog/user-registration-dialog/user-registration-dialog.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WarehouseComponent } from './components/masterfile/warehouse/warehouse.component';
import { WarehouseDialogComponent } from './components/mat-dialog/warehouse-dialog/warehouse-dialog.component';
import { ItemCategoryComponent } from './components/masterfile/item-category/item-category.component';
import { ItemCategoryDialogComponent } from './components/mat-dialog/item-category-dialog/item-category-dialog.component';
import { SupplierComponent } from './components/masterfile/supplier/supplier.component';
import { SupplierDialogComponent } from './components/mat-dialog/supplier-dialog/supplier-dialog.component';
import { ItemSubCategoryComponent } from './components/masterfile/item-sub-category/item-sub-category.component';
import { ItemSubCategoryDialogComponent } from './components/mat-dialog/item-sub-category-dialog/item-sub-category-dialog.component';
import { ChartOfAccountsComponent } from './components/masterfile/chart-of-accounts/chart-of-accounts.component';
import {MatTreeModule} from '@angular/material/tree';
import { ChartOfAccountsDialogComponent } from './components/mat-dialog/chart-of-accounts-dialog/chart-of-accounts-dialog.component';
import { TestComponentComponent } from './components/masterfile/test-component/test-component.component';
import { FundsComponent } from './components/masterfile/funds/funds.component';
import { FundsDialogComponent } from './components/mat-dialog/funds-dialog/funds-dialog.component';
import { ProcurementCategoryDialogComponent } from './components/mat-dialog/procurement-category-dialog/procurement-category-dialog.component';
import { PreconditionDialogComponent } from './components/mat-dialog/precondition-dialog/precondition-dialog.component';
import { RequiredattachmentDialogComponent } from './components/mat-dialog/requiredattachment-dialog/requiredattachment-dialog.component';
import { UnitmeasureDialogComponent } from './components/mat-dialog/unitmeasure-dialog/unitmeasure-dialog.component';
import { RolemanagerDialogComponent } from './components/mat-dialog/rolemanager-dialog/rolemanager-dialog.component';
import { DeliveryReceiptComponent } from './components/transaction/delivery-receipt/delivery-receipt.component';









@NgModule({
  declarations: [
    SideBarComponent,
    DashboardComponent,
    PropertyItemsComponent,
    EnvironmentalAspectsComponent,
    EnvironmentalImpactsComponent,
    ProcurementCategoryComponent,
    HasRoleDirective,
    AccountSettingsComponent,
    UserManagerComponent,
    ProcurementCategoryComponent,
    TestComponent,
    PropertyItemsDialogComponent,
    EnvironmentalAspectsDialogComponent,
    UserRegistrationDialogComponent,
    PreConditionsComponent,
    RequiredAttachmentComponent,
    UnitOfMeasureComponent,
    RoleManagerComponent,
    RolemanagerDialogComponent,
    RequiredattachmentModalComponent,
    ReceivedPropertyComponent,
    PropertyDetailsComponent,
    UserListComponent,
    WarehouseComponent,
    WarehouseDialogComponent,
    ItemCategoryComponent,
    ItemCategoryDialogComponent,
    ChartOfAccountsComponent,	
	  SupplierDialogComponent,
    ItemSubCategoryDialogComponent,
    ChartOfAccountsComponent,	
    ChartOfAccountsDialogComponent,
	  SupplierDialogComponent,
    ItemSubCategoryComponent,
    SupplierComponent,
    SupplierComponent,
    TestComponentComponent,    SupplierComponent,
    FundsComponent,
    FundsDialogComponent,
    ProcurementCategoryDialogComponent,
    PreconditionDialogComponent,
    RequiredattachmentDialogComponent,
    UnitmeasureDialogComponent,
    DeliveryReceiptComponent,
  
  ],
  imports: [
    CommonModule,
    EamisRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatTreeModule
 
  ]
})
export class EamisModule { }
