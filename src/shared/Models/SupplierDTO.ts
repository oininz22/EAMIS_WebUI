import { BarangayDTO } from "./BarangayDTO"

export class SupplierDTO{
    id: number
    companyName: string
    companyDescription: string
    regionCode: number
    provinceCode: number
    cityMunicipalityCode: number
    brgyCode: number
    street: string
    contactPersonName: string
    contactPersonNumber: string
    bank: string
    accountName: string
    accountNumber: number
    branch: string
    isActive: Boolean
    barangay: BarangayDTO
}