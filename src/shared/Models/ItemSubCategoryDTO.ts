import { ItemCategoryDTO } from "./ItemCategoryDTO"

export class ItemSubCategoryDTO{
    id: number
    categoryId: number
    subCategoryName: string
    isActive: boolean
    itemCategory: ItemCategoryDTO
}