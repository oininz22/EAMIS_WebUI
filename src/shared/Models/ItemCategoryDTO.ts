import { AisOfficeDTO } from "./AisOfficeDTO"
import { ChartofAccountsDTO } from "./ChartofAccountsDTO"

export class ItemCategoryDTO{
    id: number
    
    chartOfAccountId: number
    officeId: number
    accountCodeName: string
    shortDesc: string
    categoryName: string
    fundSourceId: number
    responsibilityCode: string
    isStockable: boolean
    stockQuantity: number
    estimatedLife: number
    costMethod: string
    depreciationMethod: string
    isSerialized: boolean
    isActive: boolean
    chartOfAccounts: ChartofAccountsDTO
    officeInfo: AisOfficeDTO
}