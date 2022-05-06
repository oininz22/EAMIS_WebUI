import { AuthorizationDTO } from "./AuthorizationDTO"
import { FinancingSourceDTO } from "./FinancingSourceDTO"
import { GeneralFundSourceDTO } from "./GeneralFundSourceDTO"

export class FundsDTO {
    id: number
    authorizationId: number
    code: string
    financingSourceId: number
    fundCategory: string
    genFundId: number
    authorization: AuthorizationDTO
    financingSource: FinancingSourceDTO
    generalFundSource: GeneralFundSourceDTO

}