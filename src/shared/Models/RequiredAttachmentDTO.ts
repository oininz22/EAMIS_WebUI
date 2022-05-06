import { AttachmentTypeDTO } from "./AttachmentTypeDTO"

export class AttachmentDTO{
    id: number
    attachmentDescription: string
    is_Required : boolean
    attachmentTypeDTO : AttachmentTypeDTO
}