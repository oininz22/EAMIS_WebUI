import { ItemCategoryDTO } from "./ItemCategoryDTO"
import { SupplierDTO } from "./SupplierDTO"
import { UnitofMeasureDTO } from "./UnitofMeasureDTO"
import { WarehouseDTO } from "./WarehouseDTO"

export interface PropertyItemsDTO{
    
    id: number
    appNo: string
    propertyNo: string
    propertyName: string
    categoryId: number
    brand: string
    uomId: number
    warehouseId: number
    propertyType: string
    model: string
    quantity: number
    supplierId: number
    isActive: boolean
    itemCategory: ItemCategoryDTO
    unitOfMeasure: UnitofMeasureDTO
    warehouse: WarehouseDTO
    supplier: SupplierDTO
}