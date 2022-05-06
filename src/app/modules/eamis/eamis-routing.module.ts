import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PropertyItemsComponent } from './components/masterfile/property-items/property-items.component';
import { EnvironmentalAspectsComponent } from './components/masterfile/environmental-aspects/environmental-aspects.component';
import { EnvironmentalImpactsComponent } from './components/masterfile/environmental-impacts/environmental-impacts.component';
import { ProcurementCategoryComponent } from './components/masterfile/procurement-category/procurement-category.component';
import { AuthenticatorGuard } from 'src/app/authenticator.guard';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { PreConditionsComponent } from './components/masterfile/pre-conditions/pre-conditions.component';
import { RequiredAttachmentComponent } from './components/masterfile/required-attachment/required-attachment.component';
import { UnitOfMeasureComponent } from './components/masterfile/unit-of-measure/unit-of-measure.component';
import { RequiredattachmentModalComponent } from './components/transaction/requiredattachment-modal/requiredattachment-modal.component';
import { ReceivedPropertyComponent } from './components/transaction/received-property/received-property.component';
import { PropertyDetailsComponent } from './components/transaction/property-details/property-details.component';
import { RoleManagerComponent } from './components/role-manager/role-manager.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WarehouseComponent } from './components/masterfile/warehouse/warehouse.component';
import { ItemCategoryComponent } from './components/masterfile/item-category/item-category.component';
import { SupplierComponent } from './components/masterfile/supplier/supplier.component';
import { ItemSubCategoryComponent } from './components/masterfile/item-sub-category/item-sub-category.component';
import { ChartOfAccountsComponent } from './components/masterfile/chart-of-accounts/chart-of-accounts.component';
import { TestComponent } from './components/masterfile/test/test.component';
import { TestComponentComponent } from './components/masterfile/test-component/test-component.component';
import { FundsComponent } from './components/masterfile/funds/funds.component';
import { DeliveryReceiptComponent } from './components/transaction/delivery-receipt/delivery-receipt.component';

const routes: Routes = [
  { path: '', 
    component: SideBarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent,canActivate:[AuthenticatorGuard],data:{roles: ["Administrator"]}},
      { path: 'sidenav', component: SideBarComponent},
      { path: 'role-manager', component: RoleManagerComponent },
      { path: 'user-list', component: UserListComponent},
      { path: 'masterfile/property-items', component: PropertyItemsComponent},
      { path: 'masterfile/environmental-aspects', component: EnvironmentalAspectsComponent},
      { path: 'masterfile/environmental-impacts', component: EnvironmentalImpactsComponent},
      { path: 'masterfile/procurement-category', component: ProcurementCategoryComponent},
      { path: 'masterfile/pre-conditions', component: PreConditionsComponent},
      { path: 'masterfile/required-attachment', component: RequiredAttachmentComponent},
      { path: 'masterfile/item-category', component: ItemCategoryComponent},
      { path: 'transaction/requiredattachment-modal',component: RequiredattachmentModalComponent},
      { path: 'transaction/received-property',component:ReceivedPropertyComponent},
      { path: 'masterfile/unit-of-measure', component: UnitOfMeasureComponent},
      { path: 'masterfile/stockroom', component: WarehouseComponent},
      { path: 'masterfile/supplier', component: SupplierComponent},
      { path: 'accountsettings',component: AccountSettingsComponent},
      { path: 'transaction/property-details',component:PropertyDetailsComponent},
      { path: 'masterfile/item-sub-category', component: ItemSubCategoryComponent},
      { path: 'masterfile/chart-of-accounts', component:ChartOfAccountsComponent},
      { path: 'masterfile/funds', component: FundsComponent},
      {path: 'masterfile/test-component', component:TestComponentComponent},
      {path: 'transaction/delivery-receipt', component: DeliveryReceiptComponent},
      { path: 'test', component: TestComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EamisRoutingModule { }
