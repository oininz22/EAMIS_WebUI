import { ClassificationDTO } from "./ClassificationDTO"
import { GroupClassificationDTO } from "./GroupClassificationDTO"
import { SubClassificationDTO } from "./SubClassificationDTO"

export class ChartofAccountsDTO{
    id: number
    groupId: number
    objectCode: string
    accountCode: string
    isPartofInventroy: Boolean
    isActive: Boolean
    classificationDTO : ClassificationDTO
    subclassificationDTO : SubClassificationDTO
    groupClassificationDTO : GroupClassificationDTO
}